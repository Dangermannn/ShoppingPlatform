namespace ShoppingPlatform.API.Dtos
{
    public class CategoryToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool HasChild { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}