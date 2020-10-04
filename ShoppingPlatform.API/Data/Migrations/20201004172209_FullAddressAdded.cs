using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingPlatform.API.Data.Migrations
{
    public partial class FullAddressAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullAddress",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullAddress",
                table: "Users");
        }
    }
}
