using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Interfaces;
using ShoppingPlatform.API.Entities;
using AutoMapper;
using ShoppingPlatform.API.Dtos;

namespace ShoppingPlatform.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public ProductsController(IProductsRepository productsRepository, IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _productsRepository = productsRepository;
        }

        [HttpGet("archive")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetArchivedProducts()
        {
            var products = await _productsRepository.GetArchivedProductsAsync();

            var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpGet("archive/{id}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetArchivedProductById(int id)
        {
            var product = await _productsRepository.GetArchivedProductByIdAsync(id);

            var productToReturn = _mapper.Map<ProductToReturnDto>(product);
            return Ok(productToReturn);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetProducts()
        {
            var products = await _productsRepository.GetProductsAsync();

            var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetProducts(string category)
        {
            var products = await _productsRepository.GetProductsByCategoryAsync(category);

            var productsToReturn = _mapper.Map<IEnumerable<ProductToReturnDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);
            var productToReturn = _mapper.Map<ProductToReturnDto>(product);

            return productToReturn;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryToReturnDto>>> GetCategories()
        {
            var categories = await _productsRepository.GetCategories();
            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryToReturnDto>>(categories);

            return Ok(categoriesToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);
            if (product == null)
                return BadRequest();

            if (product != null)
                _productsRepository.DeleteProduct(product);

            if (await _productsRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to delete product");
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductForCreationDto productForCreationDto)
        {
            var category = await _productsRepository.GetCategory(productForCreationDto.CategoryName);
            var seller = await _userRepository.GetUserByUsernameAsync(productForCreationDto.SellerName);
            if (category == null || seller == null)
                return BadRequest("Cannot find a category or seller");

            var product = new Product
            {
                Title = productForCreationDto.Title,
                Description = productForCreationDto.Description,
                Category = category,
                Price = productForCreationDto.Price,
                Seller = seller
            };

            _productsRepository.AddProduct(product);
            if (await _productsRepository.SaveAllAsync())
                return Ok();
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductForUpdate productForCreationDto)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);

            _mapper.Map(productForCreationDto, product);

            if(await _productsRepository.SaveAllAsync())
                return Ok();

            throw new System.Exception($"Updating product failed on save!");
        }
    }
}