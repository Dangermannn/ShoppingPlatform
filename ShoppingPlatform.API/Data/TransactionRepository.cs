using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Entities;
using ShoppingPlatform.API.Interfaces;

namespace ShoppingPlatform.API.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly DataContext _context;
        public TransactionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _context.Transactions.Include(t => t.Seller).Include(t => t.Buyer).Include(t => t.Products).ToListAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _context.Transactions.Include(t => t.Seller).Include(t => t.Buyer).Include(t => t.Products).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Transaction>> GetAllUserTransactionsAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Seller).Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => (t.Seller.Username == name && t.IsVisibleBySeller) || (t.Buyer.Username == name && t.IsVisibleByBuyer)).ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsBySellerNameAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Seller).Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => t.Seller.Username == name).ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByBuyerNameAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Seller).Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => t.Buyer.Username == name).ToListAsync();
        }
    }
}