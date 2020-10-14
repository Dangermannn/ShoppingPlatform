using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Product> Products { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<ArchivedProduct> ArchivedProduct { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}