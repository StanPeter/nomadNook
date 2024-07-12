using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(DataContext context) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<User>> RegisterUser(RegisterDto registerDto)
    {
        using var hmac = new HMACSHA512();

        var user = new User
        {
            UserName = registerDto.UserName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }
}
