using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ActorsInGame {
    public Guid ActorId { get; set; }
    public Guid GameId { get; set; }
    public string Character { get; set; } = null!;

    public virtual Actor Actor { get; set; } = null!;
    public virtual Game Game { get; set; } = null!;
}

