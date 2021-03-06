using System;

namespace ShoppingPlatform.API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public decimal Price { get; set; }
        public User Seller { get; set; }
        public DateTime AddedDate { get; set; }

        public Product()
        {
            AddedDate = DateTime.Now;
        }
    }
}