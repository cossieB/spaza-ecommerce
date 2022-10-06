using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/developers")]
public class DeveloperController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;

    public DeveloperController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }
    [HttpGet()]
    public async Task<IActionResult> GetDevelopers([FromQuery] int limit = 100) {
        return Ok(await this.db.Developers.Take(limit).ToListAsync());
    }
    [HttpGet("{uuid}")]
    public async Task<IActionResult> GetDeveloper(Guid uuid) {
        var dev = await this.db.Developers.FirstOrDefaultAsync(item => item.DeveloperId == uuid);
        if (dev == null) return NotFound();

        var query = from gop in this.db.GamesOnPlatforms
                    join pform in this.db.Platforms on gop.PlatformId equals pform.PlatformId
                    join game in this.db.Games on gop.GameId equals game.GameId
                    where game.DeveloperId == uuid
                    orderby gop.Discount descending
                    select new { gop, pform, game };
        var gamesList = await query.ToListAsync();

        var games = gamesList.Select(g => {
            return new {
                game = this.mapper.Map<GameDTO>(g.game),
                platform = this.mapper.Map<PlatformDTO>(g.pform),
                gop = this.mapper.Map<GopDTO>(g.gop),
            };
        });

        return Ok(new {
            item = this.mapper.Map<DeveloperDTO>(dev),
            games
        });
    }
}