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
                .ForMember(dest => dest.Seller, opt => opt.MapFrom(src => src.Seller))
                .ReverseMap();
            CreateMap<Product, ProductForUpdate>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ReverseMap();
            CreateMap<Category, CategoryToReturnDto>()
                .ForMember(dest => dest.ParentCategoryId, opt => opt.MapFrom(src => src.ParentCategory.Id)).ReverseMap();
            CreateMap<User, UserForUpdateDto>().ReverseMap();
            CreateMap<Transaction, TransactionDto>()
                .ForMember(dest => dest.Buyer, opt => opt.MapFrom(src => src.Buyer))
                .ReverseMap();
            CreateMap<ArchivedProduct, ArchivedProductToReturnDto>();
            CreateMap<TransactionForCreationDto, Transaction>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products));
                /*
            CreateMap<ProductToReturnDto, ArchivedProduct>()
                .ForMember(dest => dest.Seller, opt => opt.MapFrom(src => src.Seller))
                .ForMember(dest => dest.Category.Name, opt => opt.MapFrom(src => src.CategoryName));
                */
            CreateMap<ArchivedProduct, ProductToReturnDto>()
                .ForMember(src => src.Id, opt => opt.Ignore())
                .ForMember(src => src.Seller, opt => opt.MapFrom(src => src.Seller))
                .ReverseMap();
        }
    }
}