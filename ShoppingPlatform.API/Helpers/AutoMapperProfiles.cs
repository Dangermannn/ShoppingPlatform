using AutoMapper;
using ShoppingPlatform.API.Dtos;
using ShoppingPlatform.API.Entities;

namespace ShoppingPlatform.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserToReturnDto>().ReverseMap();
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.SellerName, opt => opt.MapFrom(src => src.Seller.Username));
        }
    }
}