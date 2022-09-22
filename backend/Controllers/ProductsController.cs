using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql.Internal.TypeHandlers;

namespace backend.Controllers;

[ApiController]
[Route("/api/products")]
public class ProductsController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;
    public ProductsController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] int? limit) {
        var query = from gop in this.db.GamesOnPlatforms
                    join pform in this.db.Platforms on gop.PlatformId equals pform.PlatformId
                    join game in this.db.Games on gop.GameId equals game.GameId
                    orderby gop.Sku
                    select new { gop, pform, game };
        var games = await query.ToListAsync();

        var obj = games.Select(g => {
            return new {
                game = this.mapper.Map<GameDTO>(g.game),
                platform = this.mapper.Map<PlatformDTO>(g.pform),
                gop = this.mapper.Map<GopDTO>(g.gop),
            };
        }).Take(12);

        return Ok(obj);
    }

    [HttpGet("{sku}")]
    public async Task<IActionResult> GetProduct(string? sku) {
        try {
            if (string.IsNullOrEmpty(sku)) {
                
            }
            Guid id;
            if (Guid.TryParse(sku, out id) == false) {
                return NotFound(new Error("Product doesn't exist"));
            }

            var query = from gop in this.db.GamesOnPlatforms
                        join pform in this.db.Platforms on gop.PlatformId equals pform.PlatformId
                        join game in this.db.Games on gop.GameId equals game.GameId
                        join pub in this.db.Publishers on game.PublisherId equals pub.PublisherId
                        join dev in this.db.Developers on game.DeveloperId equals dev.DeveloperId
                        where gop.Sku == id
                        select new { gop, pform, game, pub, dev };
            var games = await query.ToListAsync();

            if (games.Count == 0) {
                return NotFound(new Error("Product doesn't exist"));
            }
            var gameDto = this.mapper.Map<GameDTO>(games[0].game);
            var platformDto = this.mapper.Map<PlatformDTO>(games[0].pform);
            var gopDto = this.mapper.Map<GopDTO>(games[0].gop);
            var devDto = this.mapper.Map<DeveloperDTO>(games[0].dev);
            var pubDto = this.mapper.Map<PublisherDTO>(games[0].pub);

            return Ok(new {
                game = gameDto,
                developer = devDto,
                publisher = pubDto,
                platform = platformDto,
                gop = gopDto
            });
        }
        catch (System.Exception) {
            return StatusCode(StatusCodes.Status500InternalServerError, new Error("Something went wrong"));
        }
    }
}