using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/platforms")]
public class PlatformsController : ControllerBase {
    private readonly DataContext db;

    public PlatformsController(DataContext db) {
        this.db = db;
    }
    [HttpGet]
    public async Task<IActionResult> GetPlatforms() {
        return Ok( await this.db.Platforms.ToListAsync() );
    }
}