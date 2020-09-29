using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Dtos;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext __context;
        public AccountController(DataContext _context)
        {
            __context = _context;
        }

        // Registration a user
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserForRegisterDto userForRegisterDto)
        {
            if(await UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");
                
            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = userForRegisterDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userForRegisterDto.Password)),
                PasswordSalt = hmac.Key
            };

            __context.Users.Add(user);
            await __context.SaveChangesAsync();
            
            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            return await __context.Users.AnyAsync(u => u.Username == username.ToLower());
        }
    }
}