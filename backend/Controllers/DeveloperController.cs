using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/developers")]
public class DeveloperController : ControllerBase {
    private readonly DataContext db;

    public DeveloperController(DataContext db) {
        this.db = db;
    }
    [HttpGet()]
    public async Task<IActionResult> GetDevelopers([FromQuery] int limit = 100) {
        return Ok(await this.db.Developers.Take(limit).ToListAsync());
    }
}