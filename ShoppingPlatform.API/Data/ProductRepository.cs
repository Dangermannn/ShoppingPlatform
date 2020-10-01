using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Entities;
using ShoppingPlatform.API.Interfaces;

namespace ShoppingPlatform.API.Data
{
    public class ProductRepository : IProductsRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Seller).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Seller).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}