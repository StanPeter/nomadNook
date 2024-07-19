using API.Enums;
using API.Extensions;

namespace API.Entities;

public class User
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required Gender Gender { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateOfBirth { get; set; }
    public required string NickName { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; }
    public string? Introduction { get; set; }
    public string? LookingFor { get; set; }
    public string? Interests { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required List<Photo> Photos { get; set; } = [];

    public int GetAge()
    {
        return DateOfBirth.CalculateAge();
    }
}
