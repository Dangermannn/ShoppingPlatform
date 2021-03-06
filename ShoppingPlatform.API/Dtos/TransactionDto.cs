using System;
using System.Collections.Generic;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Dtos
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public DateTime Initialized { get; set; }
        public UserToReturnDto Buyer { get; set; }
        public decimal Price { get; set; }
        public ICollection<ArchivedProductToReturnDto> Products { get; set; }
    }
}