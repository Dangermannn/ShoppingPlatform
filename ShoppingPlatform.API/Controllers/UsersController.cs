using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Interfaces;
using ShoppingPlatform.API.Entities;
namespace ShoppingPlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());
        }

        /*
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }
        */


        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }

    }
}