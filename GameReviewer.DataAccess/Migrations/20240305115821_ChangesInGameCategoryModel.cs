using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameReviewer.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInGameCategoryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GameCategories",
                table: "GameCategories");

            migrationBuilder.AddColumn<int>(
                name: "GameCategoryId",
                table: "GameCategories",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameCategories",
                table: "GameCategories",
                column: "GameCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_GameCategories_GameId",
                table: "GameCategories",
                column: "GameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GameCategories",
                table: "GameCategories");

            migrationBuilder.DropIndex(
                name: "IX_GameCategories_GameId",
                table: "GameCategories");

            migrationBuilder.DropColumn(
                name: "GameCategoryId",
                table: "GameCategories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameCategories",
                table: "GameCategories",
                columns: new[] { "GameId", "CategoryId" });
        }
    }
}
