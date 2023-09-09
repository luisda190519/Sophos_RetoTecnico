using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using PlayPalace_backend.DTO;

namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly ProjectContext _context;

        public RentalController(ProjectContext context)
        {
            _context = context;
        }

        // Get a rental by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRentalById(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);

            if (rental == null)
            {
                return NotFound("Rental not found."); // Return a 404 Not Found response if the rental is not found.
            }

            return Ok(rental); // Return a 200 OK response with the rental data.
        }

        // Create a rental
        [HttpPost]
        public async Task<ActionResult<Rental>> CreateRental([FromBody] Rental rental)
        {
            if (rental == null)
            {
                return BadRequest("Invalid rental data."); // Return a 400 Bad Request response if the rental data is invalid.
            }

            try
            {
                // Ensure that the customer and game with the specified IDs exist in the database.
                var customerExists = await _context.Customers.AnyAsync(c => c.CustomerID == rental.customerID);
                var gameExists = await _context.Games.AnyAsync(g => g.GameID == rental.GameID);

                if (!customerExists || !gameExists)
                {
                    return BadRequest("Invalid customer or game ID."); // Return a 400 Bad Request response if the customer or game ID is not found.
                }

                rental.RentalDate = DateTime.UtcNow; // Set the rental date to the current UTC time.
                rental.DueDate = rental.RentalDate.AddDays(7); // Set the due date to one week from the rental date.

                // Calculate the rental price based on your business logic
                rental.CalculateRentalPrice(); // Call the CalculateRentalPrice method on the rental object.

                _context.Rentals.Add(rental);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetRentalById), new { id = rental.RentalID }, rental); // Return a 201 Created response with the newly created rental.
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error: " + ex.Message);
            }
        }

        // List the most rented games
        [HttpGet("mostrentedgames")]
        public async Task<ActionResult<IEnumerable<Game>>> GetMostRentedGames()
        {
            var mostRentedGames = await _context.Rentals
                .GroupBy(r => r.GameID)
                .Select(g => new
                {
                    GameID = g.Key,
                    RentalCount = g.Count()
                })
                .OrderByDescending(g => g.RentalCount)
                .Take(10) // You can adjust the number of games you want to retrieve
                .ToListAsync();

            if (mostRentedGames.Count == 0)
            {
                return NotFound("No rented games found."); // Return a 404 response if no rented games are found.
            }

            var gameIds = mostRentedGames.Select(g => g.GameID).ToList();

            // Retrieve the game details for the most rented games
            var games = await _context.Games
                .Where(g => gameIds.Contains(g.GameID))
                .ToListAsync();

            return Ok(games); // Return a 200 OK response with the list of most rented games.
        }

        // List the least rented games by age range in 10-year intervals
        [HttpGet("leastrentedgamesbyagerange")]
        public ActionResult<Dictionary<string, List<Game>>> GetLeastRentedGamesByAgeRange()
        {
            // Define age ranges
            var allAgeRanges = new List<string>
    {
        "0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100", "100+"
    };

            // Get all rentals
            var rentals = _context.Rentals.Include(r => r.Customer)
                                           .ThenInclude(c => c.ApplicationUser)
                                           .ToList();

            // Calculate age range for a given age
            string GetAgeRange(int age)
            {
                if (age >= 0 && age <= 10) return "0-10";
                if (age >= 11 && age <= 20) return "11-20";
                if (age >= 21 && age <= 30) return "21-30";
                if (age >= 31 && age <= 40) return "31-40";
                if (age >= 41 && age <= 50) return "41-50";
                if (age >= 51 && age <= 60) return "51-60";
                if (age >= 61 && age <= 70) return "61-70";
                if (age >= 71 && age <= 80) return "71-80";
                if (age >= 81 && age <= 90) return "81-90";
                if (age >= 91 && age <= 100) return "91-100";
                return "100+";
            }

            // Calculate the count of rentals in each age range
            var ageRangeCounts = allAgeRanges
                .Select(ageRange => new
                {
                    AgeRange = ageRange,
                    Count = rentals.Count(r =>
                        r.Customer != null && // Check if Customer is not null
                        r.Customer.ApplicationUser != null && // Check if ApplicationUser is not null
                        GetAgeRange(r.Customer.ApplicationUser.Age) == ageRange)
                })
                .ToDictionary(x => x.AgeRange, x => x.Count);

            // Initialize an empty dictionary for least rented games by age range
            var leastRentedGamesByAgeRange = new Dictionary<string, List<Game>>();

            // Loop through each age range and find the least rented game(s)
            foreach (var ageRange in allAgeRanges)
            {
                var minCount = ageRangeCounts[ageRange];
                var leastRentedGames = rentals
                    .Where(r =>
                        r.Customer != null && // Check if Customer is not null
                        r.Customer.ApplicationUser != null && // Check if ApplicationUser is not null
                        GetAgeRange(r.Customer.ApplicationUser.Age) == ageRange)
                    .GroupBy(x => x.GameID)
                    .OrderBy(gg => gg.Count())
                    .FirstOrDefault()?.Key;

                // Retrieve the least rented game(s) based on the GameID
                var leastRentedGame = _context.Games.Find(leastRentedGames);

                // Add the least rented game(s) to the dictionary
                leastRentedGamesByAgeRange[ageRange] = new List<Game> { leastRentedGame };
            }

            return Ok(leastRentedGamesByAgeRange);
        }

        // Helper method to determine the age range based on age
        private string GetAgeRange(int age)
        {
            // Implement your logic to determine the age range based on the age
            // For example, you can use Math.Floor(age / 10) * 10 to group by 10-year ranges.
            int lowerBound = (int)Math.Floor((double)age / 10) * 10;
            int upperBound = lowerBound + 9;

            return $"{lowerBound}-{upperBound}";
        }



        // Change the daily rate for a rental
        [HttpPut("{id}/changedailyrate")]
        public async Task<ActionResult<Rental>> ChangeDailyRate(int id, [FromBody] double dailyRate)
        {
            var rental = await _context.Rentals.FindAsync(id);

            if (rental == null)
            {
                return NotFound("Rental not found."); // Return a 404 Not Found response if the rental is not found.
            }

            rental.DailyRate = dailyRate;

            // Recalculate the rental price based on the updated daily rate
            rental.CalculateRentalPrice();

            _context.Entry(rental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(rental); // Return a 200 OK response with the updated rental data.
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update rental.");
            }
        }

   

    }
}
