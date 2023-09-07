using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayPalace_backend.Migrations
{
    /// <inheritdoc />
    public partial class modelsChanges2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GamePlatform_Platform_GamePlatformsPlatformID",
                table: "GamePlatform");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Platform",
                table: "Platform");

            migrationBuilder.RenameTable(
                name: "Platform",
                newName: "Platforms");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Platforms",
                table: "Platforms",
                column: "PlatformID");

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlatform_Platforms_GamePlatformsPlatformID",
                table: "GamePlatform",
                column: "GamePlatformsPlatformID",
                principalTable: "Platforms",
                principalColumn: "PlatformID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GamePlatform_Platforms_GamePlatformsPlatformID",
                table: "GamePlatform");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Platforms",
                table: "Platforms");

            migrationBuilder.RenameTable(
                name: "Platforms",
                newName: "Platform");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Platform",
                table: "Platform",
                column: "PlatformID");

            migrationBuilder.AddForeignKey(
                name: "FK_GamePlatform_Platform_GamePlatformsPlatformID",
                table: "GamePlatform",
                column: "GamePlatformsPlatformID",
                principalTable: "Platform",
                principalColumn: "PlatformID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
