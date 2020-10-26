using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingPlatform.API.Data.Migrations
{
    public partial class TransactionVisibilityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleByBuyer",
                table: "Transactions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVisibleBySeller",
                table: "Transactions",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVisibleByBuyer",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IsVisibleBySeller",
                table: "Transactions");
        }
    }
}
