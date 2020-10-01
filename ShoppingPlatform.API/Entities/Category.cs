namespace ShoppingPlatform.API.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Category ParentCategory { get; set; }
    }
}