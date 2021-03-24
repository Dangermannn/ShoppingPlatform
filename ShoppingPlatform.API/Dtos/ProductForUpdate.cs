namespace ShoppingPlatform.API.Dtos
{
    public class ProductForUpdate
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
    }
}