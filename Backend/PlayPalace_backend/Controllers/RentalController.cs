using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;
using System.Text.Json.Serialization;
using System.Text.Json;

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

        ////Crear una transaccion
        //[HttpPost("create-transaction")]
        //public async Task<IActionResult> CreateTransaction([FromBody] Rental rentalRequest)
        //{
        //    if (rentalRequest == null)
        //    {
        //        return BadRequest("Invalid request data.");
        //    }

        //    var customer = await dbContext.Customers.FindAsync(rentalRequest.CustomerID);
        //    var game = await dbContext.Games.FindAsync(rentalRequest.GameID);

        //    if (customer == null || game == null)
        //    {
        //        return NotFound("Customer or game not found.");
        //    }

        //    var rental = new Rental
        //    {
        //        CustomerID = customer.CustomerID,
        //        GameID = game.GameID,
        //        RentalDate = DateTime.Now,
        //        DueDate = rentalRequest.DueDate,
        //        Price = game.Price,
        //        PayMethod = rentalRequest.PayMethod,
        //        Finished = false
        //    };

        //    dbContext.Rentals.Add(rental);
        //    await dbContext.SaveChangesAsync();

        //    return Ok("Rental created successfully.");
        //}


        //Most frecuented customers
        //[HttpGet("frequent-customers")]
        //public async Task<ActionResult> GetFrequentCustomers()
        //{
        //    var frequentCustomers = await dbContext.Customers
        //        .Include(c => c.Rentals)
        //        .OrderByDescending(c => c.Rentals.Count)
        //        .ToListAsync();

        //    var jsonSerializerOptions = new JsonSerializerOptions
        //    {
        //        ReferenceHandler = ReferenceHandler.Preserve,
        //        // Add any other serialization options you need
        //    };

        //    var json = JsonSerializer.Serialize(frequentCustomers, jsonSerializerOptions);

        //    return Ok(json);
        //}


        //Most rented Games
        [HttpGet("most-rented")]
        public async Task<ActionResult<IEnumerable<Game>>> GetMostRentedGames()
        {
            var mostRentedGames = await dbContext.Games
                .Include(g => g.Rentals)
                .OrderByDescending(g => g.Rentals.Count)
                .Take(10)
                .ToListAsync();

            var jsonSerializerOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                // Add any other serialization options you need
            };

            var json = JsonSerializer.Serialize(mostRentedGames, jsonSerializerOptions);

            return Ok(json);
        }

        //rented games by 10 year by year
        //[HttpGet("least-rented-game-by-age-range")]
        //public IActionResult GetLeastRentedGameByAgeRange()
        //{
        //    // Define the age range increment (e.g., 10 years)
        //    int ageRangeIncrement = 10;

        //    // Get the current year to calculate ages
        //    int currentYear = DateTime.Now.Year;

        //    // Initialize a dictionary to store the results with age range as the key
        //    Dictionary<string, Game> results = new Dictionary<string, Game>();

        //    // Loop through age ranges, starting from 10 years old
        //    for (int ageStart = 10; ageStart <= 100; ageStart += ageRangeIncrement)
        //    {
        //        int ageEnd = ageStart + ageRangeIncrement - 1;

        //        // Query rentals for customers within the current age range
        //        var rentalsInAgeRange = dbContext.Rentals
        //            .Include(r => r.Customer)
        //            .Where(r => (currentYear - r.Customer.YearOfBirth) >= ageStart &&
        //                        (currentYear - r.Customer.YearOfBirth) <= ageEnd)
        //            .ToList();

        //        // Find the least rented game within the age range
        //        var leastRentedGame = dbContext.Games
        //            .Include(g => g.GameAgeRanges)
        //            .Where(g => g.GameAgeRanges.Any(ar => ar.StartAge <= ageEnd && ar.EndAge >= ageStart))
        //            .OrderBy(g => rentalsInAgeRange.Count(r => r.GameID == g.GameID))
        //            .FirstOrDefault();

        //        // Create a key for the age range
        //        string ageRangeKey = $"{ageStart}-{ageEnd} years";

        //        // Add the least rented game to the dictionary with age range as the key
        //        results.Add(ageRangeKey, leastRentedGame);
        //    }

        //    return Ok(results);
        //}


    }
}
