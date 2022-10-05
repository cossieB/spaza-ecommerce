using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Review {
    public Guid ReviewId { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public Guid Sku { get; set; }
    [ForeignKey("Sku")]
    public GamesOnPlatform Gop { get; set; }
    public string? Content { get; set; }
    public int Rating { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateEdited { get; set; }
}

public class ReviewDto {
    public Guid ReviewId { get; set; }
    public Guid UserId { get; set; }
    public Guid Sku { get; set; }
    [ForeignKey("Sku")]
    public GamesOnPlatform Gop { get; set; }
    public string? Content { get; set; }
    public int Rating { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateEdited { get; set; }
}