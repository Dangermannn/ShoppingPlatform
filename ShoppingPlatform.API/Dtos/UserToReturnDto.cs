using System;

namespace ShoppingPlatform.API.Dtos
{
    public class UserToReturnDto
    {
        public string Username { get; set; }
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public string City { get; set; }

        UserToReturnDto()
        {
            Created = DateTime.Now;
        }
    }
}