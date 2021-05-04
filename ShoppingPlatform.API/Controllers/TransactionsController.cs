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
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAllUserTransactions(string name)
        {
            var transactions = await _transactionRepository.GetAllUserTransactionsAsync(name);
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/bought")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsSoldBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsByBuyerNameAsync(name);

            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/sold")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsBoughtBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsBySellerNameAsync(name);
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsDetails(int id)
        {
            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

            var transactionToReturn = _mapper.Map<TransactionDto>(transaction);
            return Ok(transactionToReturn);
        }

        [HttpPost]
        public async Task<ActionResult> AddTransaction(TransactionForCreationDto transactionForCreation)
        {        
            var seller = await _userRepository.GetUserByIdAsync(transactionForCreation.SellerId);
            var buyer = await _userRepository.GetUserByIdAsync(transactionForCreation.BuyerId);
            
            var overallPrice = transactionForCreation.Products.Sum(p => p.Price);
            
            var listOfArchived = transactionForCreation.Products.Select(x => _mapper.Map<ArchivedProduct>(x)).ToList();

            foreach(var item in listOfArchived)
            {
                item.Category = await _productRepository.GetCategory(item.Category.Name);
                item.Seller = seller;
                item.Id = 0;
            }
            
            var transactionToPost = new Entities.Transaction
            {
                Initialized = DateTime.Now,
                Seller = seller,
                Buyer = buyer,
                Price = overallPrice,
                Products = listOfArchived.ToList(),
                IsVisibleByBuyer = true,
                IsVisibleBySeller = true
            };

            _transactionRepository.AddTransaction(transactionToPost);
            
            transactionForCreation.Products.ToList().ForEach(async x => {
                var prod = await _productRepository.GetProductByIdAsync(x.Id);
                _productRepository.DeleteProduct(prod);
            });
            
           // _productRepository.ArchiveProduct() // && await _productRepository.SaveAllAsync()
            if (await _transactionRepository.SaveAllAsync())
                return Ok();
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