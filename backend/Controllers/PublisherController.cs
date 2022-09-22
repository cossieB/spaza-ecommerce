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

    public PublisherController(DataContext db) {
        this.db = db;
    }
    [HttpGet]
    public async Task<IActionResult> GetPublishers([FromQuery] int limit = 100) {
        return Ok(await this.db.Publishers.Take(limit).ToListAsync());
    }
}