using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Purchase {
    [Key]
    public Guid PurchaseId {get; set;}
    public Guid UserId { get; set; }
    public User User {get; set;}
    public Guid Sku {get; set;}
    [ForeignKey("Sku")]
    public GamesOnPlatform Gop {get; set;}
    public double Price {get; set;}
    public int Quantity {get; set;}
    public double Total {get; set;}
    public DateTime Date {get; set;}
}