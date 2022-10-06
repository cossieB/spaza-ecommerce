using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/publishers")]
public class PublisherController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;

    public PublisherController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }
    [HttpGet]
    public async Task<IActionResult> GetPublishers([FromQuery] int limit = 100) {
        return Ok(await this.db.Publishers.Take(limit).ToListAsync());
    }
    [HttpGet("{uuid}")]
    public async Task<IActionResult> GetPublisher(Guid uuid, [FromQuery] int? page) {
        var pub = await this.db.Publishers.FirstOrDefaultAsync(item => item.PublisherId == uuid);
        if (pub == null) return NotFound();
        
        var query = from gop in this.db.GamesOnPlatforms
                    join pform in this.db.Platforms on gop.PlatformId equals pform.PlatformId
                    join game in this.db.Games on gop.GameId equals game.GameId
                    where game.PublisherId == uuid
                    orderby gop.Discount descending, gop.Quantity, gop.Sku
                    select new { gop, pform, game };
        
        var count = await query.CountAsync();
        var gamesList = await query.Skip(page * 12 ?? 0).Take(12).ToListAsync();

        var games = gamesList.Select(g => {
            return new {
                game = this.mapper.Map<GameDTO>(g.game),
                platform = this.mapper.Map<PlatformDTO>(g.pform),
                gop = this.mapper.Map<GopDTO>(g.gop),
            };
        });

        return Ok(new {
            item = this.mapper.Map<PublisherDTO>(pub),
            games,
            count
        });
    }
}