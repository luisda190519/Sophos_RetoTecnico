using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;


namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        public readonly ProjectContext dbContext;

        public GamesController(ProjectContext context)
        {
            dbContext = context;
        }

        //List all the games in the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var games = await dbContext.Games.ToListAsync();
            return Ok(games);
        }


        //List games based on the director
        [HttpGet("director/{director}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByDirector(string director)
        {
            var games = await dbContext.Games
                .Where(g => g.Director == director)
                .ToListAsync();

            return Ok(games);
        }


        //List games based the main character
        [HttpGet("protagonists/{protagonists}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByProtagonists(string protagonists)
        {
            var games = await dbContext.Games
                .Where(g => g.MainCharacters.Any(mc => mc.Name.Contains(protagonists)))
                .ToListAsync();

            return Ok(games);
        }

        //List games by producer or brand
        //[HttpGet("producerOrBrand/{producer}")]
        //public async Task<ActionResult<IEnumerable<Game>>> GetGamesByProducer(string query)
        //public async Task<ActionResult<IEnumerable<Game>>> GetGamesByProducer(string query)
        //{
        //    var games = await dbContext.Games
        //        .Where(g => g.Producer == query || g.Brand.Name == query)
        //        .ToListAsync();

        //    return Ok(games);
        //}


        //List games by release date
        [HttpGet("release/{year}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByReleaseDate(int year)
        {
            var games = await dbContext.Games
                .Where(g => g.Year.Year == year)
                .ToListAsync();

            return Ok(games);
        }

        //Create a game
        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame([FromBody] Game game)
        {
            if (game == null)
            {
                return BadRequest("Game data is invalid.");
            }

            try
            {
                dbContext.Games.Add(game);
                await dbContext.SaveChangesAsync();

                return CreatedAtAction("GetGameById", new { id = game.GameID }, game);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error creating the game: {ex.Message}");
            }
        }


    }
}
