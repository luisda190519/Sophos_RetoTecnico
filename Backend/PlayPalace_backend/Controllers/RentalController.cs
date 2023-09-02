using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        public readonly ProjectContext dbContext;

        public RentalController(ProjectContext context)
        {
            dbContext = context;
        }

        //Crear una transaccion
        [HttpPost("create-transaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] Rental rentalRequest)
        {
            if (rentalRequest == null)
            {
                return BadRequest("Invalid request data.");
            }

            var customer = await dbContext.Customers.FindAsync(rentalRequest.CustomerID);
            var game = await dbContext.Games.FindAsync(rentalRequest.GameID);

            if (customer == null || game == null)
            {
                return NotFound("Customer or game not found.");
            }

            var rental = new Rental
            {
                CustomerID = customer.CustomerID,
                GameID = game.GameID,
                RentalDate = DateTime.Now,
                DueDate = rentalRequest.DueDate,
                Price = game.Price,
                PayMethod = rentalRequest.PayMethod,
                Finished = false
            };

            dbContext.Rentals.Add(rental);
            await dbContext.SaveChangesAsync();

            return Ok("Rental created successfully.");
        }


        //Most frecuented customers
        [HttpGet("frequent-customers")]
        public async Task<ActionResult> GetFrequentCustomers()
        {
            var frequentCustomers = await dbContext.Customers
                .Include(c => c.Rentals)
                .OrderByDescending(c => c.Rentals.Count)
                .ToListAsync();

            return Ok(frequentCustomers);
        }

        //Most rented Games
        [HttpGet("most-rented")]
        public async Task<ActionResult<IEnumerable<Game>>> GetMostRentedGames()
        {
            var mostRentedGames = await dbContext.Games
                .Include(g => g.Rentals)
                .OrderByDescending(g => g.Rentals.Count)
                .Take(10)
                .ToListAsync();

            return Ok(mostRentedGames);
        }



    }
}
