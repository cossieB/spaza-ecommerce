using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actor",
                columns: table => new
                {
                    actorId = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "text", nullable: false),
                    photo = table.Column<string>(type: "text", nullable: true),
                    summary = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actor", x => x.actorId);
                });

            migrationBuilder.CreateTable(
                name: "Developer",
                columns: table => new
                {
                    developerId = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    logo = table.Column<string>(type: "text", nullable: false),
                    location = table.Column<string>(type: "text", nullable: false),
                    summary = table.Column<string>(type: "text", nullable: false),
                    country = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Developer", x => x.developerId);
                });

            migrationBuilder.CreateTable(
                name: "Platform",
                columns: table => new
                {
                    platformId = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    logo = table.Column<string>(type: "text", nullable: false),
                    summary = table.Column<string>(type: "text", nullable: false),
                    release = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Platform", x => x.platformId);
                });

            migrationBuilder.CreateTable(
                name: "Publisher",
                columns: table => new
                {
                    publisherId = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    logo = table.Column<string>(type: "text", nullable: false),
                    headquarters = table.Column<string>(type: "text", nullable: false),
                    summary = table.Column<string>(type: "text", nullable: false),
                    country = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publisher", x => x.publisherId);
                });

            migrationBuilder.CreateTable(
                name: "Game",
                columns: table => new
                {
                    gameId = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    cover = table.Column<string>(type: "text", nullable: false),
                    summary = table.Column<string>(type: "text", nullable: false),
                    developerId = table.Column<Guid>(type: "uuid", nullable: false),
                    publisherId = table.Column<Guid>(type: "uuid", nullable: false),
                    releaseDate = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false),
                    genres = table.Column<string[]>(type: "text[]", nullable: true),
                    images = table.Column<string[]>(type: "text[]", nullable: true),
                    banner = table.Column<string>(type: "text", nullable: false),
                    trailer = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Game", x => x.gameId);
                    table.ForeignKey(
                        name: "Game_developerId_fkey",
                        column: x => x.developerId,
                        principalTable: "Developer",
                        principalColumn: "developerId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Game_publisherId_fkey",
                        column: x => x.publisherId,
                        principalTable: "Publisher",
                        principalColumn: "publisherId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ActorsInGames",
                columns: table => new
                {
                    actorId = table.Column<Guid>(type: "uuid", nullable: false),
                    gameId = table.Column<Guid>(type: "uuid", nullable: false),
                    character = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("ActorsInGames_pkey", x => new { x.actorId, x.gameId });
                    table.ForeignKey(
                        name: "ActorsInGames_actorId_fkey",
                        column: x => x.actorId,
                        principalTable: "Actor",
                        principalColumn: "actorId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ActorsInGames_gameId_fkey",
                        column: x => x.gameId,
                        principalTable: "Game",
                        principalColumn: "gameId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GamesOnPlatforms",
                columns: table => new
                {
                    sku = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    gameId = table.Column<Guid>(type: "uuid", nullable: false),
                    platformId = table.Column<Guid>(type: "uuid", nullable: false),
                    dateAdded = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    discount = table.Column<int>(type: "integer", nullable: false),
                    lastUpdated = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    price = table.Column<double>(type: "double precision", nullable: false, defaultValueSql: "60")
                },
                constraints: table =>
                {
                    table.PrimaryKey("GamesOnPlatforms_pkey", x => x.sku);
                    table.ForeignKey(
                        name: "GamesOnPlatforms_gameId_fkey",
                        column: x => x.gameId,
                        principalTable: "Game",
                        principalColumn: "gameId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "GamesOnPlatforms_platformId_fkey",
                        column: x => x.platformId,
                        principalTable: "Platform",
                        principalColumn: "platformId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActorsInGames_gameId",
                table: "ActorsInGames",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_Game_developerId",
                table: "Game",
                column: "developerId");

            migrationBuilder.CreateIndex(
                name: "IX_Game_publisherId",
                table: "Game",
                column: "publisherId");

            migrationBuilder.CreateIndex(
                name: "IX_GamesOnPlatforms_gameId",
                table: "GamesOnPlatforms",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_GamesOnPlatforms_platformId",
                table: "GamesOnPlatforms",
                column: "platformId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActorsInGames");

            migrationBuilder.DropTable(
                name: "GamesOnPlatforms");

            migrationBuilder.DropTable(
                name: "Actor");

            migrationBuilder.DropTable(
                name: "Game");

            migrationBuilder.DropTable(
                name: "Platform");

            migrationBuilder.DropTable(
                name: "Developer");

            migrationBuilder.DropTable(
                name: "Publisher");
        }
    }
}
