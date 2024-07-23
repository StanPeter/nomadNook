namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsProfileImage { get; set; }
    public string? PublicId { get; set; }
    public int UserId { get; set; }

    // public required User User { get; set; } = null!;
    public User? User { get; set; }
}
