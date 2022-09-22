using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/search")]
public class SearchController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;

    public SearchController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }

    [HttpGet("autocomplete")]
    public async Task<IActionResult> Autocomplete([FromQuery] string text) {

        if (string.IsNullOrEmpty(text)) {
            return BadRequest();
        }
        var games = await this.db.Games.Where(game => game.Title.ToLower().Contains(text)).ToListAsync();
        // var developers = await this.db.Developers.Where(game => game.Name.ToLower().Contains(text)).ToListAsync();
        // var publishers = await this.db.Developers.Where(game => game.Name.ToLower().Contains(text)).ToListAsync();

        return Ok(games);
    }
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] string s) {
        var query = from gop in this.db.GamesOnPlatforms
                    join platform in this.db.Platforms on gop.PlatformId equals platform.PlatformId
                    join game in this.db.Games on gop.GameId equals game.GameId
                    where game.Title.ToLower().Contains(s)
                    select new { gop, platform, game };
        
        var temp = await query.ToListAsync();
        var skus = temp.Select(item => new {
            platform = this.mapper.Map<PlatformDTO>(item.platform),
            gop = this.mapper.Map<GopDTO>(item.gop),
            game = this.mapper.Map<GameDTO>(item.game)
        });
        return Ok(skus);
    }
    [HttpPost]
    public async Task<IActionResult> Search( [FromBody] RequestBody obj) {
        var query = from gop in this.db.GamesOnPlatforms
                    join platform in this.db.Platforms on gop.PlatformId equals platform.PlatformId
                    join game in this.db.Games on gop.GameId equals game.GameId
                    where game.Title.ToLower().Contains(obj.text)
                    select new { gop, platform, game };
        if (obj != null) {
            query = query.Where(item => item.gop.Price < obj.maxPrice)
                         .Where(item => obj.platformFilter.Contains(item.gop.PlatformId));
        }

        var temp = await query.ToListAsync();
        var skus = temp.Select(item => new {
            platform = this.mapper.Map<PlatformDTO>(item.platform),
            gop = this.mapper.Map<GopDTO>(item.gop),
            game = this.mapper.Map<GameDTO>(item.game)
        });
        return Ok(skus);
    }
}

public record RequestBody {
    public string text { get; set; }
    public int maxPrice { get; set; }
    public IEnumerable<Guid> platformFilter { get; set; }
}