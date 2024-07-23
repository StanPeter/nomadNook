using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, MemberDto>()
            .ForMember(
                d => d.PhotoUrl,
                o => o.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsProfileImage)!.Url)
            );
        CreateMap<Photo, PhotoDto>();
    }
}
