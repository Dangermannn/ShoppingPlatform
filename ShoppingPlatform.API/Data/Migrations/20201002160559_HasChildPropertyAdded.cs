using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingPlatform.API.Data.Migrations
{
    public partial class HasChildPropertyAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasChild",
                table: "Categories",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasChild",
                table: "Categories");
        }
    }
}
