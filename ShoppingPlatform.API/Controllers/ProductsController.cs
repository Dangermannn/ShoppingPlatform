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
        private readonly IMapper _mapper;
        public ProductsController(IProductsRepository productsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _productsRepository = productsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductToReturnDto>>> GetProducts()
        {
            var products = await _productsRepository.GetProductsAsync();

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
    }
}