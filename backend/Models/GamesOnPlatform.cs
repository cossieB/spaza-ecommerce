using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class GamesOnPlatform {
    public Guid GameId { get; set; }
    public Guid PlatformId { get; set; }
    public DateTime DateAdded { get; set; }
    public int Discount { get; set; }
    public DateTime LastUpdated { get; set; }
    public double Price { get; set; }
    public Guid Sku { get; set; }
    public int Quantity { get; set; }
    public virtual Game Game { get; set; } = null!;
    public virtual Platform Platform { get; set; } = null!;
}

public class GopDTO {
    public int Discount { get; set; }
    public double Price { get; set; }
    public Guid Sku { get; set; }
    public int Quantity { get; set; }
}
