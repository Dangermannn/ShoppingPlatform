using System.Collections.Generic;

namespace ShoppingPlatform.API.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<UserRole> Users { get; set; }
    }
}