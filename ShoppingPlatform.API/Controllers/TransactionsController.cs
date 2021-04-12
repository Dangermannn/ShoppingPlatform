using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingPlatform.API.Dtos;
using ShoppingPlatform.API.Interfaces;

namespace ShoppingPlatform.API.Controllers
{
    // "api/users/{userid}/[controller]"
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;
        public TransactionsController(ITransactionRepository transactionRepository, IMapper mapper)
        {
            _mapper = mapper;
            _transactionRepository = transactionRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactions()
        {
            var transactions = await _transactionRepository.GetTransactionsAsync();
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetAllUserTransactions(string name)
        {
            var transactions = await _transactionRepository.GetAllUserTransactionsAsync(name);
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/bought")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactionsSoldBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsByBuyerNameAsync(name);

            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/sold")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactionsBoughtBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsBySellerNameAsync(name);
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/{id}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactionsDetails(int id)
        {
            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

            var transactionToReturn = _mapper.Map<TransactionToReturnDto>(transaction);
            return Ok(transactionToReturn);
        }
        
        [HttpPut("{name}/{id}")]
        [Authorize]
        public async Task<ActionResult<Transaction>> UpdateTransactionVisibility(string name, int id)
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