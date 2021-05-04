using Microsoft.EntityFrameworkCore.Migrations;

namespace ShoppingPlatform.API.Data.Migrations
{
    public partial class RemovedSellerFromTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Users_SellerId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SellerId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "Transactions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SellerId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SellerId",
                table: "Transactions",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Users_SellerId",
                table: "Transactions",
                column: "SellerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
