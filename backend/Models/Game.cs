using System;
using System.Collections.Generic;

namespace backend.Models;
public partial class Game {
    public Game() {
        ActorsInGames = new HashSet<ActorsInGame>();
        GamesOnPlatforms = new HashSet<GamesOnPlatform>();
    }

    public Guid GameId { get; set; }
    public string Title { get; set; } = null!;
    public string Cover { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public Guid DeveloperId { get; set; }
    public Guid PublisherId { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string[]? Genres { get; set; }
    public string[]? Images { get; set; }
    public string Banner { get; set; } = null!;
    public string Trailer { get; set; } = null!;

    public virtual Developer Developer { get; set; } = null!;
    public virtual Publisher Publisher { get; set; } = null!;
    public virtual ICollection<ActorsInGame> ActorsInGames { get; set; }
    public virtual ICollection<GamesOnPlatform> GamesOnPlatforms { get; set; }
}


public class GameDTO {
    public Guid GameId { get; set; }
    public string Title { get; set; } = null!;
    public string Cover { get; set; } = null!;
    public string Summary { get; set; } = null!;
    public Guid DeveloperId { get; set; }
    public Guid PublisherId { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string[]? Genres { get; set; }
    public string[]? Images { get; set; }
    public string Banner { get; set; } = null!;
    public string Trailer { get; set; } = null!;
}