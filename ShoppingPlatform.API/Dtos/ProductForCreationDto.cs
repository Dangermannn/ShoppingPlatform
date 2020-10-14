namespace ShoppingPlatform.API.Dtos
{
    public class ProductForCreationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public int SellerId { get; set; }
    }
}