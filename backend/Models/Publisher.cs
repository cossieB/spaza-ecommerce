using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Publisher {
    public Publisher() {
        Games = new HashSet<Game>();
    }

    public Guid PublisherId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Headquarters { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Country { get; set; } = null!;

    public virtual ICollection<Game> Games { get; set; }
}


public class PublisherDTO {
    public Guid PublisherId { get; set; }
    public string Name { get; set; } = null!;
    public string Logo { get; set; } = null!;
    public string Headquarters { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public string Country { get; set; } = null!;
}