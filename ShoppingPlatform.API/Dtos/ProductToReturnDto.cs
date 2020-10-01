namespace ShoppingPlatform.API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public string SellerName { get; set; }
    }
}