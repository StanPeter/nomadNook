using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [MaxLength(50)]
    [Required]
    public required string UserName { get; set; }
    [Required]
    public required string Password { get; set; }
}
