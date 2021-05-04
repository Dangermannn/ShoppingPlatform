using System.Collections.Generic;

namespace ShoppingPlatform.API.Dtos
{
    public class ProductsForTransactionDto
    {
        public ICollection<ArchivedProductToReturnDto> Products { get; set; }
    }
}