using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Product> Products { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}