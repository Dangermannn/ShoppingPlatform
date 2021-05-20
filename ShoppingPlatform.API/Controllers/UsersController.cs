using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Interfaces;
using ShoppingPlatform.API.Entities;
using AutoMapper;
using ShoppingPlatform.API.Dtos;
using System;

namespace ShoppingPlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            if(users == null)
                return NoContent();

            return Ok( _mapper.Map<IEnumerable<UserToReturnDto>>(users));
        }

        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if(user == null)
                return NoContent();

            return Ok(_mapper.Map<UserToReturnDto>(user));
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateUser(string username, UserForUpdateDto userForUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if(user == null)
                return BadRequest("There's no user with that username");

            _mapper.Map(userForUpdateDto, user);
            
            if(await _userRepository.SaveAllAsync())
                return NoContent();

            throw new Exception($"Updating user {username} failed on save!");
        }

    }
}