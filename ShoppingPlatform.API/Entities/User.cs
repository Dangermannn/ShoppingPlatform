using System;
using System.Collections.Generic;

namespace ShoppingPlatform.API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string FullAddress { get; set; }
        ICollection<Transaction> Sold { get; set; }
        ICollection<Transaction> Bought { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; }
    }
}