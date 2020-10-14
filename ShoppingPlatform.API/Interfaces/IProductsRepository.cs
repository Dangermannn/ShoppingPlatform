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
        void DeleteProduct(Product product);
        Task<Category> GetCategory(string category);
        Task<IEnumerable<Category>> GetCategories();
    }
}