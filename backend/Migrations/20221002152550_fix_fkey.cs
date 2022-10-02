using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class fix_fkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_GamesOnPlatforms_GopSku",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_GamesOnPlatforms_GopSku",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_GopSku",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_GopSku",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "GopSku",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "GopSku",
                table: "Purchases");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Sku",
                table: "Reviews",
                column: "Sku");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_Sku",
                table: "Purchases",
                column: "Sku");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_GamesOnPlatforms_Sku",
                table: "Purchases",
                column: "Sku",
                principalTable: "GamesOnPlatforms",
                principalColumn: "sku",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_GamesOnPlatforms_Sku",
                table: "Reviews",
                column: "Sku",
                principalTable: "GamesOnPlatforms",
                principalColumn: "sku",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_GamesOnPlatforms_Sku",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_GamesOnPlatforms_Sku",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_Sku",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_Sku",
                table: "Purchases");

            migrationBuilder.AddColumn<Guid>(
                name: "GopSku",
                table: "Reviews",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "GopSku",
                table: "Purchases",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GopSku",
                table: "Reviews",
                column: "GopSku");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_GopSku",
                table: "Purchases",
                column: "GopSku");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_GamesOnPlatforms_GopSku",
                table: "Purchases",
                column: "GopSku",
                principalTable: "GamesOnPlatforms",
                principalColumn: "sku",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_GamesOnPlatforms_GopSku",
                table: "Reviews",
                column: "GopSku",
                principalTable: "GamesOnPlatforms",
                principalColumn: "sku",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
