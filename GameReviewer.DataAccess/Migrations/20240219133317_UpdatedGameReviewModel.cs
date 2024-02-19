using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameReviewer.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedGameReviewModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "GameReviews",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "GameReviews");
        }
    }
}
