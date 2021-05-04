using System.Collections.Generic;

namespace ShoppingPlatform.API.Dtos
{
    public class TransactionForCreationDto
    {
        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        public ICollection<ProductToReturnDto> Products { get; set; }
    }
}