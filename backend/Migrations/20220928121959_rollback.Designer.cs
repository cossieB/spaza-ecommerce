﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220928121959_rollback")]
    partial class rollback
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Actor", b =>
                {
                    b.Property<Guid>("ActorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("actorId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Photo")
                        .HasColumnType("text")
                        .HasColumnName("photo");

                    b.Property<string>("Summary")
                        .HasColumnType("text")
                        .HasColumnName("summary");

                    b.HasKey("ActorId");

                    b.ToTable("Actor", (string)null);
                });

            modelBuilder.Entity("backend.Models.ActorsInGame", b =>
                {
                    b.Property<Guid>("ActorId")
                        .HasColumnType("uuid")
                        .HasColumnName("actorId");

                    b.Property<Guid>("GameId")
                        .HasColumnType("uuid")
                        .HasColumnName("gameId");

                    b.Property<string>("Character")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("character");

                    b.HasKey("ActorId", "GameId")
                        .HasName("ActorsInGames_pkey");

                    b.HasIndex("GameId");

                    b.ToTable("ActorsInGames");
                });

            modelBuilder.Entity("backend.Models.Developer", b =>
                {
                    b.Property<Guid>("DeveloperId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("developerId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("country");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("location");

                    b.Property<string>("Logo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("logo");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("name");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("summary");

                    b.HasKey("DeveloperId");

                    b.ToTable("Developer", (string)null);
                });

            modelBuilder.Entity("backend.Models.Game", b =>
                {
                    b.Property<Guid>("GameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("gameId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Banner")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("banner");

                    b.Property<string>("Cover")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("cover");

                    b.Property<Guid>("DeveloperId")
                        .HasColumnType("uuid")
                        .HasColumnName("developerId");

                    b.Property<string[]>("Genres")
                        .HasColumnType("text[]")
                        .HasColumnName("genres");

                    b.Property<string[]>("Images")
                        .HasColumnType("text[]")
                        .HasColumnName("images");

                    b.Property<Guid>("PublisherId")
                        .HasColumnType("uuid")
                        .HasColumnName("publisherId");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("releaseDate");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("summary");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("title");

                    b.Property<string>("Trailer")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("trailer");

                    b.HasKey("GameId");

                    b.HasIndex("DeveloperId");

                    b.HasIndex("PublisherId");

                    b.ToTable("Game", (string)null);
                });

            modelBuilder.Entity("backend.Models.GamesOnPlatform", b =>
                {
                    b.Property<Guid>("Sku")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("sku")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<DateTime>("DateAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("dateAdded")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("Discount")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("discount")
                        .HasDefaultValueSql("0");

                    b.Property<Guid>("GameId")
                        .HasColumnType("uuid")
                        .HasColumnName("gameId");

                    b.Property<DateTime>("LastUpdated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("lastUpdated")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<Guid>("PlatformId")
                        .HasColumnType("uuid")
                        .HasColumnName("platformId");

                    b.Property<double>("Price")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("double precision")
                        .HasColumnName("price")
                        .HasDefaultValueSql("60");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("Sku")
                        .HasName("GamesOnPlatforms_pkey");

                    b.HasIndex("GameId");

                    b.HasIndex("PlatformId");

                    b.ToTable("GamesOnPlatforms");
                });

            modelBuilder.Entity("backend.Models.Platform", b =>
                {
                    b.Property<Guid>("PlatformId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("platformId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Logo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("logo");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("name");

                    b.Property<DateTime>("Release")
                        .HasColumnType("timestamp(3) without time zone")
                        .HasColumnName("release");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("summary");

                    b.HasKey("PlatformId");

                    b.ToTable("Platform", (string)null);
                });

            modelBuilder.Entity("backend.Models.Publisher", b =>
                {
                    b.Property<Guid>("PublisherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("publisherId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("country");

                    b.Property<string>("Headquarters")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("headquarters");

                    b.Property<string>("Logo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("logo");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("name");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("summary");

                    b.HasKey("PublisherId");

                    b.ToTable("Publisher", (string)null);
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("userId")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.HasKey("UserId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("backend.Models.ActorsInGame", b =>
                {
                    b.HasOne("backend.Models.Actor", "Actor")
                        .WithMany("ActorsInGames")
                        .HasForeignKey("ActorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("ActorsInGames_actorId_fkey");

                    b.HasOne("backend.Models.Game", "Game")
                        .WithMany("ActorsInGames")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("ActorsInGames_gameId_fkey");

                    b.Navigation("Actor");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("backend.Models.Game", b =>
                {
                    b.HasOne("backend.Models.Developer", "Developer")
                        .WithMany("Games")
                        .HasForeignKey("DeveloperId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Game_developerId_fkey");

                    b.HasOne("backend.Models.Publisher", "Publisher")
                        .WithMany("Games")
                        .HasForeignKey("PublisherId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("Game_publisherId_fkey");

                    b.Navigation("Developer");

                    b.Navigation("Publisher");
                });

            modelBuilder.Entity("backend.Models.GamesOnPlatform", b =>
                {
                    b.HasOne("backend.Models.Game", "Game")
                        .WithMany("GamesOnPlatforms")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("GamesOnPlatforms_gameId_fkey");

                    b.HasOne("backend.Models.Platform", "Platform")
                        .WithMany("GamesOnPlatforms")
                        .HasForeignKey("PlatformId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("GamesOnPlatforms_platformId_fkey");

                    b.Navigation("Game");

                    b.Navigation("Platform");
                });

            modelBuilder.Entity("backend.Models.Actor", b =>
                {
                    b.Navigation("ActorsInGames");
                });

            modelBuilder.Entity("backend.Models.Developer", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("backend.Models.Game", b =>
                {
                    b.Navigation("ActorsInGames");

                    b.Navigation("GamesOnPlatforms");
                });

            modelBuilder.Entity("backend.Models.Platform", b =>
                {
                    b.Navigation("GamesOnPlatforms");
                });

            modelBuilder.Entity("backend.Models.Publisher", b =>
                {
                    b.Navigation("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
