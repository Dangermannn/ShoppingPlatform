using System;
using System.ComponentModel.DataAnnotations;

namespace ShoppingPlatform.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string FullAddress { get; set; }
    }
}