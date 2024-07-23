using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{userName}")]
    public async Task<ActionResult<User>> GetUser(string userName)
    {
        var user = await userRepository.GetMemberByNameAsync(userName);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}
