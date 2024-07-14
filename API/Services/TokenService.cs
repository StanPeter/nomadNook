using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateJwtToken(User user)
    {
        var tokenSecret =
            config["TokenSecret"]
            ?? throw new Exception("No TokenKey could be found inside of app settings config");
        if (tokenSecret.Length < 64)
            throw new Exception("Token needs to be at least 64 characters");
        var tokenSecretEncoded = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecret));

        var claims = new List<Claim> { new(ClaimTypes.NameIdentifier, user.UserName), };

        var credentials = new SigningCredentials(
            tokenSecretEncoded,
            SecurityAlgorithms.HmacSha512Signature
        );

        var tokenDescriptior = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptior);

        return tokenHandler.WriteToken(token);
    }
}
