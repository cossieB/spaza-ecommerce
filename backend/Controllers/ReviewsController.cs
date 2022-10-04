using System.Security.Claims;
using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiController]
[Route("/api/reviews")]
public class ReviewsController : ControllerBase {
    private readonly DataContext db;
    private readonly IMapper mapper;

    public ReviewsController(DataContext db, IMapper mapper) {
        this.db = db;
        this.mapper = mapper;
    }

    [HttpPost("rate"), Authorize]
    public async Task<IActionResult> Rate(Rating request) {
        if (request.rating < 1 || request.rating > 5) return BadRequest(new Error("Illegal rating"));

        Guid userId;
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out userId) == false) return BadRequest(new Error("Invalid user"));

        var purchase = await this.db.Purchases.AnyAsync(p => p.UserId == userId && p.Sku == request.sku);

        if (purchase == false) {
            return Forbid("Only users who have purchased this item can review it.");
        }

        var previousReview = await this.db.Reviews.FirstOrDefaultAsync(rev => rev.UserId == userId && rev.Sku == request.sku);

        if (previousReview != null) {
            previousReview.Content = request.review;
            previousReview.DateEdited = DateTime.UtcNow;
            previousReview.Rating = request.rating;

            await this.db.SaveChangesAsync();
            return Ok();
        }

        var review = new Review {
            Content = request.review,
            Sku = request.sku,
            Rating = request.rating,
            ReviewId = Guid.NewGuid(),
            UserId = userId
        };
        this.db.Reviews.Add(review);
        await this.db.SaveChangesAsync();
        return Ok();
    }
    [HttpGet("review"), Authorize]
    public async Task<IActionResult> GetReview([FromQuery] Guid sku) {
        Guid userId;
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out userId) == false) return BadRequest(new Error("Invalid user"));

        var review = await this.db.Reviews.FirstOrDefaultAsync(rev => rev.UserId == userId && rev.Sku == sku);
        if (review == null) return NotFound();

        return Ok(new {
            content = review.Content,
            rating = review.Rating
        });
    }
}