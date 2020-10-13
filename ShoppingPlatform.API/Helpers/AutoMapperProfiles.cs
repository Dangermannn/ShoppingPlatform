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
                .ForMember(dest => dest.Seller, opt => opt.MapFrom(src => src.Seller));
            CreateMap<Category, CategoryToReturnDto>()
                .ForMember(dest => dest.ParentCategoryId, opt => opt.MapFrom(src => src.ParentCategory.Id)).ReverseMap();
            CreateMap<User, UserForUpdateDto>().ReverseMap();
            CreateMap<Transaction, TransactionToReturnDto>()
                .ForMember(dest => dest.Buyer, opt => opt.MapFrom(src => src.Buyer))
                .ForMember(dest => dest.Seller, opt => opt.MapFrom(src => src.Seller));
            CreateMap<ArchivedProduct, ArchivedProductToReturnDto>();
        }
    }
}