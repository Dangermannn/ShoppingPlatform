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

        public void AddTransaction(Transaction transaction)
        {
            //_context.Entry(transaction.Buyer).State = EntityState.Unchanged;
            //_context.Entry(transaction.Seller).State = EntityState.Unchanged;
            _context.Entry(transaction).State = EntityState.Unchanged;
            foreach(var product in transaction.Products)
            {
                _context.Entry(product).State = EntityState.Unchanged;
                
                _context.ArchivedProduct.Add(product);
            }
            
            //_context.ArchivedProduct.Attach();
            _context.Add(transaction);
        }

        public void RemoveTransaction(Transaction transaction)
        {
            _context.Remove(transaction);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _context.Transactions.Include(t => t.Buyer).Include(t => t.Products).ToListAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _context.Transactions.Include(t => t.Buyer).Include(t => t.Products).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Transaction>> GetAllUserTransactionsAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => (t.Buyer.Username == name && t.IsVisibleByBuyer)).ToListAsync();
        }

        
        public async Task<IEnumerable<Transaction>> GetTransactionsBySellerNameAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => t.Buyer.Username == name).ToListAsync();
        }
        
        public async Task<IEnumerable<Transaction>> GetTransactionsByBuyerNameAsync(string name)
        {
            return await _context.Transactions.Include(t => t.Buyer).Include(t => t.Products)
                .Where(t => t.Buyer.Username == name).ToListAsync();
        }
    }
}