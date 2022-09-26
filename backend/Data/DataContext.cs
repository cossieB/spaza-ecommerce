using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public partial class DataContext : DbContext {
    public DataContext() {
    }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options) {
    }

    public virtual DbSet<Actor> Actors { get; set; } = null!;
    public virtual DbSet<ActorsInGame> ActorsInGames { get; set; } = null!;
    public virtual DbSet<Developer> Developers { get; set; } = null!;
    public virtual DbSet<Game> Games { get; set; } = null!;
    public virtual DbSet<GamesOnPlatform> GamesOnPlatforms { get; set; } = null!;
    public virtual DbSet<Platform> Platforms { get; set; } = null!;
    public virtual DbSet<Publisher> Publishers { get; set; } = null!;
    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        if (!optionsBuilder.IsConfigured) {
            optionsBuilder.UseNpgsql("Name=ConnectionStrings:psql");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Actor>(entity => {
            entity.ToTable("Actor");

            entity.Property(e => e.ActorId)
                .HasColumnName("actorId")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Name).HasColumnName("name");

            entity.Property(e => e.Photo).HasColumnName("photo");

            entity.Property(e => e.Summary).HasColumnName("summary");
        });

        modelBuilder.Entity<ActorsInGame>(entity => {
            entity.HasKey(e => new { e.ActorId, e.GameId })
                .HasName("ActorsInGames_pkey");

            entity.Property(e => e.ActorId).HasColumnName("actorId");

            entity.Property(e => e.GameId).HasColumnName("gameId");

            entity.Property(e => e.Character).HasColumnName("character");

            entity.HasOne(d => d.Actor)
                .WithMany(p => p.ActorsInGames)
                .HasForeignKey(d => d.ActorId)
                .HasConstraintName("ActorsInGames_actorId_fkey");

            entity.HasOne(d => d.Game)
                .WithMany(p => p.ActorsInGames)
                .HasForeignKey(d => d.GameId)
                .HasConstraintName("ActorsInGames_gameId_fkey");
        });

        modelBuilder.Entity<Developer>(entity => {
            entity.ToTable("Developer");

            entity.Property(e => e.DeveloperId)
                .HasColumnName("developerId")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Country).HasColumnName("country");

            entity.Property(e => e.Location).HasColumnName("location");

            entity.Property(e => e.Logo).HasColumnName("logo");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.Property(e => e.Summary).HasColumnName("summary");
        });

        modelBuilder.Entity<Game>(entity => {
            entity.ToTable("Game");

            entity.Property(e => e.GameId)
                .HasColumnName("gameId")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Banner).HasColumnName("banner");

            entity.Property(e => e.Cover).HasColumnName("cover");

            entity.Property(e => e.DeveloperId).HasColumnName("developerId");

            entity.Property(e => e.Genres).HasColumnName("genres");

            entity.Property(e => e.Images).HasColumnName("images");

            entity.Property(e => e.PublisherId).HasColumnName("publisherId");

            entity.Property(e => e.ReleaseDate)
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("releaseDate");

            entity.Property(e => e.Summary).HasColumnName("summary");

            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.Property(e => e.Trailer).HasColumnName("trailer");

            entity.HasOne(d => d.Developer)
                .WithMany(p => p.Games)
                .HasForeignKey(d => d.DeveloperId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Game_developerId_fkey");

            entity.HasOne(d => d.Publisher)
                .WithMany(p => p.Games)
                .HasForeignKey(d => d.PublisherId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("Game_publisherId_fkey");
        });

        modelBuilder.Entity<GamesOnPlatform>(entity => {
            entity.HasKey(e => e.Sku)
                .HasName("GamesOnPlatforms_pkey");

            entity.Property(e => e.Sku)
                .HasColumnName("sku")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.DateAdded)
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("dateAdded")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.Discount)
                .HasColumnName("discount")
                .HasDefaultValueSql("0");

            entity.Property(e => e.GameId).HasColumnName("gameId");

            entity.Property(e => e.LastUpdated)
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("lastUpdated")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.PlatformId).HasColumnName("platformId");

            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.Property(e => e.Price)
                .HasColumnName("price")
                .HasDefaultValueSql("60");

            entity.HasOne(d => d.Game)
                .WithMany(p => p.GamesOnPlatforms)
                .HasForeignKey(d => d.GameId)
                .HasConstraintName("GamesOnPlatforms_gameId_fkey");

            entity.HasOne(d => d.Platform)
                .WithMany(p => p.GamesOnPlatforms)
                .HasForeignKey(d => d.PlatformId)
                .HasConstraintName("GamesOnPlatforms_platformId_fkey");
        });

        modelBuilder.Entity<Platform>(entity => {
            entity.ToTable("Platform");

            entity.Property(e => e.PlatformId)
                .HasColumnName("platformId")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Logo).HasColumnName("logo");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.Property(e => e.Release)
                .HasColumnType("timestamp(3) without time zone")
                .HasColumnName("release");

            entity.Property(e => e.Summary).HasColumnName("summary");
        });

        modelBuilder.Entity<Publisher>(entity => {
            entity.ToTable("Publisher");

            entity.Property(e => e.PublisherId)
                .HasColumnName("publisherId")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Country).HasColumnName("country");

            entity.Property(e => e.Headquarters).HasColumnName("headquarters");

            entity.Property(e => e.Logo).HasColumnName("logo");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.Property(e => e.Summary).HasColumnName("summary");
        });
        modelBuilder.Entity<User>(entity => {
            entity.ToTable("User");
            entity.Property(e => e.UserId).HasColumnName("userId").HasDefaultValueSql("gen_random_uuid()");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

