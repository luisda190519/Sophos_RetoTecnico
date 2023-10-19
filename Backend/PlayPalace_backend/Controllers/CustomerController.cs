using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ProjectContext _context;

        public CustomerController(UserManager<ApplicationUser> userManager, ProjectContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        //Create a new user
        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest("Customer data is invalid.");
            }

            try
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCustomerById", new { id = customer.CustomerID }, customer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating the customer: {ex.Message}");
            }
        }

        //Get customer by id
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetCustomerById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(); // Return a 404 response if the user is not found.
            }

            return Ok(user); // Return a 200 OK response with the user (customer) details.
        }

        [HttpGet("mostfrequentcustomers")]
        public async Task<IActionResult> GetMostFrequentCustomers()
        {
            var customers = await _userManager.Users.ToListAsync(); // Get all customers

            var mostFrequentCustomers = customers
                .Select(customer => new
                {
                    CustomerId = customer.Id,
                    Name = customer.Name,
                    LastName = customer.LastName,
                    Email = customer.Email,
                    RentalCount = _context.Rentals.Count(r => r.customerID == customer.Id)
                })
                .OrderByDescending(customer => customer.RentalCount) // Order by rental count
                .Take(10) // Get the top 10 most frequent customers 
                .ToList();

            return Ok(mostFrequentCustomers);
        }


        [HttpGet("{id}/history")]
        public async Task<IActionResult> GetCustomerInfo(int id)
        {
            // Get the ApplicationUser based on the provided ID
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Calculate the customer's balance 
            double customerBalance = _context.Rentals
                .Where(r => r.customerID == id)
                .Sum(r => r.TotalBalance);

            // Get the customer's rented games and delivery dates
            var rentedGames = _context.Rentals
                .Where(r => r.customerID == id)
                .Select(r => new
                {
                    GameId = r.GameID,
                    DueDate = r.DueDate,
                    Delivered = r.Finished
                })
                .ToList();

            var customerInfo = new
            {
                CustomerId = user.Id,
                Balance = customerBalance,
                RentedGames = rentedGames
            };

            return Ok(customerInfo);
        }
    }



}

