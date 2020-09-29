using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}