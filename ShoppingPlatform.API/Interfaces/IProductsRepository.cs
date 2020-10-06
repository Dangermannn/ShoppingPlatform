using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Interfaces
{
    public interface IProductsRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
        Task<bool> SaveAllAsync();
        void Update(Product product);
        Task<IEnumerable<Category>> GetCategories();
    }
}