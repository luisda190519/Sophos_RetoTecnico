using Microsoft.AspNetCore.Http;
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
        public readonly ProjectContext dbContext;

        public CustomerController(ProjectContext context)
        {
            dbContext = context;
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
                dbContext.Customers.Add(customer);
                await dbContext.SaveChangesAsync();

                return CreatedAtAction("GetCustomerById", new { id = customer.CustomerID }, customer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating the customer: {ex.Message}");
            }
        }

        //Get customer by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomerById(int id)
        {
            var customer = await dbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            return Ok(customer);
        }


        //get customer info
        [HttpGet("{id}/details")]
        public async Task<ActionResult> GetCustomerDetails(int id)
        {
            var customer = await dbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            var customerDetails = await dbContext.Customers
                .Where(c => c.CustomerID == id)
                .Select(c => new
                {
                    Customer = c,
                    Balance = dbContext.Rentals
                        .Where(r => r.CustomerID == id)
                        .Sum(r => r.Price),
                    DeliveryDate = dbContext.Rentals
                        .Where(r => r.CustomerID == id)
                        .Max(r => r.DueDate),
                    RentedTitles = dbContext.Rentals
                        .Where(r => r.CustomerID == id)
                        .Select(r => r.Game.Title)
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (customerDetails == null)
            {
                return NotFound("Customer details not found.");
            }

            return Ok(customerDetails);
        }





    }
}
