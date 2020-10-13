using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Interfaces
{
    public interface ITransactionRepository
    {
        Task<Transaction> GetTransactionByIdAsync(int id);
        Task<IEnumerable<Transaction>> GetTransactionsAsync();

        Task<IEnumerable<Transaction>> GetAllUserTransactionsAsync(string name);
        Task<IEnumerable<Transaction>> GetTransactionsBySellerNameAsync(string name);
        Task<IEnumerable<Transaction>> GetTransactionsByBuyerNameAsync(string name);
        Task<bool> SaveAllAsync();
    }
}