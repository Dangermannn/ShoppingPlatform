using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users {get; set;}
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}