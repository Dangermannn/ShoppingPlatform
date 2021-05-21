using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingPlatform.API.Entities;
using ShoppingPlatform.API.Dtos;
using ShoppingPlatform.API.Interfaces;
using System.Linq;
using System.Transactions;
using ShoppingPlatform.API.Data;

namespace ShoppingPlatform.API.Controllers
{
    // "api/users/{userid}/[controller]"
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductsRepository _productRepository;
        private readonly IMapper _mapper;
        public TransactionsController(ITransactionRepository transactionRepository, IUserRepository userRepository,
            IProductsRepository productsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _transactionRepository = transactionRepository;
            _userRepository = userRepository;
            _productRepository = productsRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions()
        {
            var transactions = await _transactionRepository.GetTransactionsAsync();

            if(transactions == null)
                return NoContent();
            
            return Ok(_mapper.Map<IEnumerable<TransactionDto>>(transactions));
        }

        [HttpGet("{name}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAllUserTransactions(string name)
        {
            var transactions = await _transactionRepository.GetAllUserTransactionsAsync(name);

            if(transactions == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<TransactionDto>>(transactions));
        }

        [HttpGet("{name}/bought")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsSoldBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsByBuyerNameAsync(name);

            if(transactions == null)
                return NoContent();

            return Ok(_mapper.Map<IEnumerable<TransactionDto>>(transactions));
        }

        [HttpGet("{name}/sold")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsBoughtBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsBySellerNameAsync(name);

            if(transactions == null)
                return NoContent();
            
            return Ok(_mapper.Map<IEnumerable<TransactionDto>>(transactions));
        }

        [HttpGet("{name}/{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsDetails(int id)
        {
            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

            if(transaction == null)
                return NoContent();

            return Ok(_mapper.Map<TransactionDto>(transaction));
        }

        [HttpPost]
        public async Task<ActionResult> AddTransaction(TransactionForCreationDto transactionForCreation)
        {        
            var buyer = await _userRepository.GetUserByIdAsync(transactionForCreation.BuyerId);

            if(buyer == null)
                return BadRequest("Invalid buyer");
            
            var overallPrice = transactionForCreation.Products.Sum(p => p.Price);
            
            var listOfArchived = transactionForCreation.Products.Select(x => _mapper.Map<ArchivedProduct>(x)).ToList();

            foreach(var item in listOfArchived)
            {
                item.Category = await _productRepository.GetCategory(item.Category.Name);
                item.Seller = await _userRepository.GetUserByUsernameAsync(item.Seller.Username);
                item.Id = 0;
            }
            
            var transactionToPost = new Entities.Transaction
            {
                Initialized = DateTime.Now,
                Buyer = buyer,
                Price = overallPrice,
                Products = listOfArchived,
                IsVisibleByBuyer = true,
                IsVisibleBySeller = true
            };

            _transactionRepository.AddTransaction(transactionToPost);

            foreach(var item in transactionForCreation.Products)
            {
                var prod = await _productRepository.GetProductByIdAsync(item.Id);
                //_productRepository.DeleteProduct(prod);
            }
            // _mapper.Map<TransactionDto>(transactionToPost)
            if (await _transactionRepository.SaveAllAsync())
                return CreatedAtAction(nameof(GetTransactionsDetails), new {id = transactionToPost.Id}, transactionToPost);
            
            throw new Exception("Failed while initializing transaction");
        }
        
        [HttpPut("{name}/{id}")]
        [Authorize]
        public async Task<ActionResult<Entities.Transaction>> UpdateTransactionVisibility(string name, int id)
        {
            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);
            if(transaction.Buyer.Username == name)
                transaction.IsVisibleByBuyer = false;
            else
                transaction.IsVisibleBySeller = false;
            
            if(await _transactionRepository.SaveAllAsync())
                return NoContent();
            
            throw new Exception($"Failed while updating a transaction");
        }
    }
}