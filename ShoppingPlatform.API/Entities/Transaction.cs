using System;
using System.Collections.Generic;

namespace ShoppingPlatform.API.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Initialized { get; set; }
        public User Seller { get; set; }
        public User Buyer { get; set; }
        public decimal Price { get; set; }
        public ICollection<ArchivedProduct> Products { get; set; }
    }
}