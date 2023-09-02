using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayPalace_backend.Migrations
{
    /// <inheritdoc />
    public partial class DBCreated5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Start",
                table: "GameAgeRanges",
                newName: "StartAge");

            migrationBuilder.RenameColumn(
                name: "End",
                table: "GameAgeRanges",
                newName: "EndAge");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartAge",
                table: "GameAgeRanges",
                newName: "Start");

            migrationBuilder.RenameColumn(
                name: "EndAge",
                table: "GameAgeRanges",
                newName: "End");
        }
    }
}
