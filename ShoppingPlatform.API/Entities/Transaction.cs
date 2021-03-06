using System;
using System.Collections.Generic;

namespace ShoppingPlatform.API.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Initialized { get; set; }
        public User Buyer { get; set; }
        public decimal Price { get; set; }
        public ICollection<ArchivedProduct> Products { get; set; }
        public bool IsVisibleBySeller { get; set; }
        public bool IsVisibleByBuyer { get; set; }
    }
}