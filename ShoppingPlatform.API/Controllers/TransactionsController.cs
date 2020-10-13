using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
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
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactions()
        {
            var transactions = await _transactionRepository.GetTransactionsAsync();
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetAllUserTransactions(string name)
        {
            var transactions = await _transactionRepository.GetAllUserTransactionsAsync(name);

            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/bought")]
        public async Task<ActionResult<IEnumerable<TransactionToReturnDto>>> GetTransactionsSoldBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsByBuyerNameAsync(name);

            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }

        [HttpGet("{name}/sold")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsBoughtBy(string name)
        {
            var transactions = await _transactionRepository.GetTransactionsBySellerNameAsync(name);
            
            var transactionsToReturn = _mapper.Map<IEnumerable<TransactionToReturnDto>>(transactions);
            return Ok(transactionsToReturn);
        }
    }
}