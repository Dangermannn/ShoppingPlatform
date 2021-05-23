using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPlatform.API.Data;
using ShoppingPlatform.API.Interfaces;
using ShoppingPlatform.API.Entities;
using AutoMapper;
using ShoppingPlatform.API.Dtos;
using System;

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

            if(products == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<ProductToReturnDto>>(products));
        }

        [HttpGet("archive/{id}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetArchivedProductById(int id)
        {
            var product = await _productsRepository.GetArchivedProductByIdAsync(id);

            if(product == null)
                return NoContent();

            return Ok( _mapper.Map<ProductToReturnDto>(product));
        }

        [HttpGet("archive/my-products/{username}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetUserArchivedProducts(string username)
        {
            var products = await _productsRepository.GetUserArchivedProductsAsync(username);

            if(products == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<ProductToReturnDto>>(products));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetProducts()
        {
            var products = await _productsRepository.GetProductsAsync();

            if(products == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<ProductToReturnDto>>(products));
        }

        [HttpGet("my-products/{username}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetUserProducts(string username)
        {
            var products = await _productsRepository.GetUserProductsAsync(username);
            
            if(products == null)
                return NoContent();
            
            return Ok(_mapper.Map<IEnumerable<ProductToReturnDto>>(products));
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetProducts(string category)
        {
            var products = await _productsRepository.GetProductsByCategoryAsync(category);

            if(products == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<ProductToReturnDto>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);

            if(product == null)
                return NoContent();
            
            return Ok(_mapper.Map<ProductToReturnDto>(product));
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryToReturnDto>>> GetCategories()
        {
            var categories = await _productsRepository.GetCategories();

            if(categories == null)
                return NoContent();

            return Ok( _mapper.Map<IEnumerable<CategoryToReturnDto>>(categories));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);
            if (product == null)
                return BadRequest("Invalid product id");

             _productsRepository.DeleteProduct(product);

            if (await _productsRepository.SaveAllAsync())
                return Ok();

            throw new Exception("Failed to remove product");
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
                return CreatedAtAction(nameof(GetProduct), new {id = product.Id}, _mapper.Map<ProductToReturnDto>(product));
            throw new Exception("Failed to add product");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductForUpdate productForCreationDto)
        {
            var product = await _productsRepository.GetProductByIdAsync(id);

            if(product == null)
                return BadRequest("Invalid product id");

            _mapper.Map(productForCreationDto, product);

            if(await _productsRepository.SaveAllAsync())
                return NoContent();

            throw new System.Exception($"Updating product failed on save!");
        }
    }
}