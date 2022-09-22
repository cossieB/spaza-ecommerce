using System;
using System.Collections.Generic;

namespace backend.Models;
public partial class Actor {
    public Actor() {
        ActorsInGames = new HashSet<ActorsInGame>();
    }

    public Guid ActorId { get; set; }
    public string Name { get; set; } = null!;
    public string? Photo { get; set; }
    public string? Summary { get; set; }

    public virtual ICollection<ActorsInGame> ActorsInGames { get; set; }
}
