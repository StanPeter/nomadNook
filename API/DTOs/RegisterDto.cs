using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [MaxLength(50)]
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
