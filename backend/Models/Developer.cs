using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Developer {
    public Developer() {
        Games = new HashSet<Game>();
    }

    public Guid DeveloperId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Country { get; set; } = null!;

    public virtual ICollection<Game> Games { get; set; }
}

public class DeveloperDTO {
    public Guid DeveloperId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Country { get; set; } = null!;
}
