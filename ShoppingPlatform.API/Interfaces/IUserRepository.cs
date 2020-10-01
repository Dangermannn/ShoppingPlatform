using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsernameAsync(string username);
        Task<IEnumerable<User>> GetUsersAsync();
        Task<bool> SaveAllAsync();
        void Update(User user);
    }
}