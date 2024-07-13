using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    string CreateJwtToken(User user);
}
