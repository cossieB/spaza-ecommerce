using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;
namespace backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase {
    private readonly DataContext db;
    private readonly IConfiguration config;
    private readonly IMapper mapper;

    public AuthController(DataContext db, IConfiguration config, IMapper mapper) {
        this.db = db;
        this.config = config;
        this.mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegistrationDto request) {
        var errors = new Error();
        if (request.password != request.confirmPassword) {
            errors.errors.Add("Passwords do not match");
        }
        if (request.displayName.Length < 3 || request.displayName.Length > 20) {
            errors.errors.Add("Username must be between 3 and 20 characters");
        }
        if (await this.db.Users.FirstOrDefaultAsync(u => u.Email == request.email) != null) {
            errors.errors.Add("That email has already been taken");
        }
        if (errors.errors.Count > 0) return BadRequest(errors);

        CreatePasswordHash(request.password, out byte[] hash, out byte[] salt);

        var user = new User();
        user.PasswordHash = hash;
        user.PasswordSalt = salt;
        user.Email = request.email;
        user.DisplayName = request.displayName;

        var trackedItem = this.db.Users.Add(user);
        await this.db.SaveChangesAsync();
        var id = trackedItem.Property(t => t.UserId).CurrentValue;
        var token = CreateToken(user);

        return Ok(new { token, displayName = user.DisplayName, email = user.Email });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto request) {
        var hash = BC.HashPassword(request.password, 10);
        var user = await this.db.Users.FirstOrDefaultAsync(u => u.Email == request.email);
        if (user == null) {
            return BadRequest(new Error("Invalid credentials"));
        }
        using (var hmac = new HMACSHA512(user.PasswordSalt)) {
            var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.password));
            if (!computeHash.SequenceEqual(user.PasswordHash)) {
                return BadRequest(new Error("Invalid credentials"));
            }
        }
        var token = CreateToken(user);
        return Ok(new { token, displayName = user.DisplayName, email = user.Email });
    }

    [HttpPost("purchase"), Authorize]
    public async Task<IActionResult> Purchase(Order order) {

        var user = await this.db.Users.FirstOrDefaultAsync(x => x.UserId.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier));
        if (user == null) return Forbid("User not found");

        // Query for games
        var query = from gop in this.db.GamesOnPlatforms
                    join game in this.db.Games on gop.GameId equals game.GameId
                    join platform in this.db.Platforms on gop.PlatformId equals platform.PlatformId
                    select new { gop, game, platform };

        var skus = order.items.Select(o => o.sku);

        query = query.Where(item => skus.Contains(item.gop.Sku));   // Filter only for ordered games
        var result = await query.ToListAsync();

        // find errors in the order
        var errors = new OrderError();
        foreach (var clientSideItem in order.items) {
            var item = result.FirstOrDefault(x => x.gop.Sku == clientSideItem.sku)!;
            if (clientSideItem == null) return Ok(new Error("is null"));

            var temp = item.gop.Price * (1 - item.gop.Discount / 100);
            var price = Math.Round(temp, 2);
            if (item.gop.Price != price) {
                errors.AddError(clientSideItem.sku, $"Sorry the price of {item.game.Title} on {item.platform.Name} has changed. Please refresh your browser");
            }
            if (item.gop.Quantity < clientSideItem.quantity) {
                errors.AddError(clientSideItem.sku, $"Sorry, we only have {item.gop.Quantity} {(item.gop.Quantity > 1 ? "units" : "unit")} of {item.game.Title} on {item.platform.Name} in stock. Please adjust your order amount");
            }

            // track changes in case there are no errors
            var purchase = new Purchase {
                PurchaseId = Guid.NewGuid(),
                UserId = user.UserId,
                Sku = item.gop.Sku,
                Price = clientSideItem.price,
                Quantity = clientSideItem.quantity,
                Total = clientSideItem.price * clientSideItem.quantity
            };

            this.db.Purchases.Add(purchase);
            var gopToUpdate = this.db.GamesOnPlatforms.FirstOrDefault(x => x.Sku == item.gop.Sku);
            gopToUpdate!.Quantity -= clientSideItem.quantity;
            gopToUpdate!.LastUpdated = DateTime.Now;
        }
        if (errors.errorCount > 0) {
            return BadRequest(new { errors = errors.errorList });
        }
        await this.db.SaveChangesAsync();

        return Ok(new { message = "success" });
    }
    [HttpGet("purchases"), Authorize]
    public async Task<IActionResult> Purchases() {
        var user = await this.db.Users.FirstOrDefaultAsync(x => x.UserId.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier));
        if (user == null) return Forbid("User not found");
        var query = from purchase in this.db.Purchases
                    where purchase.UserId == user.UserId
                    join gop in this.db.GamesOnPlatforms on purchase.Sku equals gop.Sku
                    join game in this.db.Games on gop.GameId equals game.GameId
                    join platform in this.db.Platforms on gop.PlatformId equals platform.PlatformId
                    select new { purchase, gop, game, platform };

        var purchases = await query.ToListAsync();
        var dto = purchases.Select(p => {
            return new {
                purchase = this.mapper.Map<PurchaseDto>(p.purchase),
                game = this.mapper.Map<GameDTO>(p.game),
                gop = this.mapper.Map<GopDTO>(p.gop),
                platform = this.mapper.Map<PlatformDTO>(p.platform)
            };
        });
        return Ok(dto);
    }
    private string CreateToken(User user) {
        List<Claim> claims = new() {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
        };
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(this.config.GetConnectionString("Token")));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials
        );
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt) {
        using (var hmac = new HMACSHA512()) {
            salt = hmac.Key;
            hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

}