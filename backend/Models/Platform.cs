using System;
using System.Collections.Generic;

namespace backend.Models;
public partial class Platform {
    public Platform() {
        GamesOnPlatforms = new HashSet<GamesOnPlatform>();
    }

    public Guid PlatformId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public DateTime Release { get; set; }
    public virtual ICollection<GamesOnPlatform> GamesOnPlatforms { get; set; }
}


public class PlatformDTO {
    public Guid PlatformId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public DateTime Release { get; set; }
}