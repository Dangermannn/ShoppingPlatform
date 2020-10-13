using System;

namespace ShoppingPlatform.API.Dtos
{
    public class ArchivedProductToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public UserToReturnDto Seller { get; set; }
        public DateTime AddedDate { get; set; }   
    }
}