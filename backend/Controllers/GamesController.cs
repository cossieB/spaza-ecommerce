using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiController]
[Route("/api/games")]
public class GamesController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;

    public GamesController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }
    [HttpGet("{uuid}/platforms")]
    public async Task<IActionResult> GetPlatforms(string uuid) {
        try {
            Guid id;
            if (Guid.TryParse(uuid, out id) == false) {
                return NotFound(new Error("Game not found"));
            }
            var query = from gop in this.db.GamesOnPlatforms
                        where gop.GameId == id
                        join pform in this.db.Platforms on gop.PlatformId equals pform.PlatformId
                        select new { pform, sku = gop.Sku };
            var platforms = await query.ToListAsync();

            if (platforms.Count == 0) {
                return NotFound(new Error("Game not found"));
            }

            return Ok(platforms);
        }
        catch (System.Exception) {
            return StatusCode(StatusCodes.Status500InternalServerError, new Error("Something went wrong"));
        }
    }
    [HttpGet]
    [Produces(typeof(IEnumerable<GameDTO>))]
    public async Task<IActionResult> GetAllGames() {
        var result = await this.db.Games.ToListAsync();
        var games = result.Select(game => this.mapper.Map<GameDTO>(game));

        return Ok(games);
    }
    [HttpGet("{uuid}")]
    public async Task<IActionResult> GetGame(string uuid) {
        try {
            Guid id;
            if (Guid.TryParse(uuid, out id) == false) {
                return NotFound(new Error("Game not found"));
            }
            var query = from game in this.db.Games
                        join gop in this.db.GamesOnPlatforms on game.GameId equals gop.GameId
                        where game.GameId == id
                        select new {sku = gop.Sku};
            var list = await query.ToListAsync();
            if (list.Count == 0) return NotFound(new Error("Game not found"));
            return Ok(list[0]);
        }
        catch (System.Exception) {
            return StatusCode(StatusCodes.Status500InternalServerError, new Error("Something went wrong"));
        }
    }
}