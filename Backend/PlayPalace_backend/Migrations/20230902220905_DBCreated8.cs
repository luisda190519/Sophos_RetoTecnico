using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayPalace_backend.Migrations
{
    /// <inheritdoc />
    public partial class DBCreated8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "YearOfBirth",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "YearOfBirth",
                table: "Customers");
        }
    }
}
