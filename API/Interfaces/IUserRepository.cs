using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(User user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<User>> GetAllUsers();
    Task<User?> GetUserByIdAsync(int id);
    Task<User?> GetUserByNameAsync(string userName);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto?> GetMemberByNameAsync(string userName);
}
