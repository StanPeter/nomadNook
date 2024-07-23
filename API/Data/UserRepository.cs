using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        var users = await context.Users.Include(u => u.Photos).ToListAsync();
        return users;
    }

    public async Task<MemberDto?> GetMemberByNameAsync(string userName)
    {
        var user = await context
            .Users.Where(u => u.UserName == userName)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        return user;
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        var users = await context
            .Users.ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .ToListAsync();
        return users;
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        var user = await context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);
        return user;
    }

    public async Task<User?> GetUserByNameAsync(string userName)
    {
        var user = await context
            .Users.Include(u => u.Photos)
            .SingleOrDefaultAsync(x => x.UserName == userName);
        return user;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(User user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
