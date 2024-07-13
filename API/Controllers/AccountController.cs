using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await IsUserRegistered(registerDto.UserName))
            return BadRequest("User already exists");

        using var hmac = new HMACSHA512();

        var user = new User
        {
            UserName = registerDto.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var userDto = new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateJwtToken(user)
        };

        return userDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u =>
            u.UserName == loginDto.UserName.ToLower()
        );
        if (user == null)
            return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < hashedPassword.Length; i++)
        {
            if (user.PasswordHash[i] != hashedPassword[i])
                return Unauthorized("Passwords don't match");
        }

        var userDto = new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateJwtToken(user)
        };

        return userDto;
    }

    private async Task<bool> IsUserRegistered(string userName)
    {
        return await context.Users.AnyAsync(u => u.UserName.ToLower() == userName.ToLower());
    }
}
