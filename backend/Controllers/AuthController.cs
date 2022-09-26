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

namespace backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase {
    private readonly DataContext db;
    private readonly IConfiguration config;

    public AuthController(DataContext db, IConfiguration config) {
        this.db = db;
        this.config = config;
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
        if (this.db.Users.FirstOrDefaultAsync(u => u.Email == request.email) != null) {
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
        return Ok(new { id });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto request) {

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
        return Ok(token);
    }
    [HttpGet("purchase"), Authorize]

    private string CreateToken(User user) {
        List<Claim> claims = new() {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
        };
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(this.config.GetConnectionString("Token")));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddSeconds(30),
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