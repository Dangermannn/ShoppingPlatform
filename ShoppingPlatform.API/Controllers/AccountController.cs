using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Dtos;
using ShoppingPlatform.API.Entities;
using ShoppingPlatform.API.Interfaces;

namespace ShoppingPlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // Registration a user
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserForRegisterDto userForRegisterDto)
        {
            if (await UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = userForRegisterDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userForRegisterDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        // Logging in
        [HttpPost("login")]
        public async Task<ActionResult<UserToReturnAfterLoginDto>> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == userForLoginDto.Username);
            if (user == null)
                return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userForLoginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");

            return new UserToReturnAfterLoginDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
         }

        // Helper methods
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username.ToLower());
        }
    }
}
