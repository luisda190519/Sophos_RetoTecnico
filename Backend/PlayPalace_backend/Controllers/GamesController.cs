﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.DTO;
using PlayPalace_backend.Models;


namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ProjectContext _context;

        public GamesController(ProjectContext context)
        {
            _context = context;
        }

        //List all the games in the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetAllGames()
        {
            var games = await _context.Games.ToListAsync();

            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound(); 
            }

            return Ok(game);
        }

        //List games based on the director
        [HttpGet("bydirector")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByDirector([FromQuery] string directorName)
        {
            var games = await _context.Games
                .Where(game => game.Director == directorName)
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified director."); // Return a 404 response if no games are found.
            }

            return Ok(games); // Return a 200 OK response with the list of games by the director.
        }




        //List games based the main character
        [HttpGet("bymaincharacter")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByMainCharacter([FromQuery] string characterName)
        {
            var games = await _context.Games
                .Where(game => game.MainCharacters.Any(character => character.Name == characterName))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified main character."); // Return a 404 response if no games are found.
            }

            return Ok(games); // Return a 200 OK response with the list of games containing the main character(s).
        }

        //List games by producer or brand
        [HttpGet("byproducerorbrand")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByProducerOrBrand(
            [FromQuery] string producerName,
            [FromQuery] string brandName)
        {
            var games = await _context.Games
                .Where(game => game.Producer == producerName || game.Brands.Any(brand => brand.Name == brandName))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified producer or brand."); // Return a 404 response if no games are found.
            }

            return Ok(games); // Return a 200 OK response with the list of games matching the producer or brand.
        }


        //List games by release date
        [HttpGet("byyear")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByYear([FromQuery] int year)
        {
            var games = await _context.Games
                .Where(game => game.Year.Year == year)
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified year."); // Return a 404 response if no games are found.
            }

            return Ok(games); // Return a 200 OK response with the list of games matching the year.
        }

        //List games by platform
        [HttpGet("byplatform")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByPlatform([FromQuery] string platformName)
        {
            var games = await _context.Games
                .Where(game => game.Platforms.Any(platform => platform.Name == platformName))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified platform."); // Return a 404 response if no games are found.
            }

            return Ok(games); // Return a 200 OK response with the list of games matching the platform.
        }

        [HttpGet("platforms/{id}")]
        public async Task<ActionResult<IEnumerable<PlatformDTO>>> GetPlatformsByGameId(int id)
        {
            var game = await _context.Games
                .Include(g => g.Platforms)
                .FirstOrDefaultAsync(g => g.GameID == id);

            if (game == null)
            {
                return NotFound();
            }

            var platforms = game.Platforms.Select(p => new PlatformDTO
            {
                PlatformID = p.PlatformID,
                Name = p.Name,
                // Initialize other properties as needed
            });

            return Ok(platforms);
        }

        [HttpGet("maincharacters/{id}")]
        public async Task<ActionResult<IEnumerable<MainCharacterDTO>>> GetMainCharactersByGameId(int id)
        {
            var game = await _context.Games
                .Include(g => g.MainCharacters)
                .FirstOrDefaultAsync(g => g.GameID == id);

            if (game == null)
            {
                return NotFound();
            }

            var mainCharacters = game.MainCharacters.Select(mc => new MainCharacterDTO
            {
                MainCharacterID = mc.CharacterID,
                Name = mc.Name,
                LastName = mc.LastName,
                ImageURL = mc.ImageURL,
                // Initialize other properties as needed
            });

            return Ok(mainCharacters);
        }

        [HttpGet("brands/{id}")]
        public async Task<ActionResult<IEnumerable<BrandDTO>>> GetBrandsByGameId(int id)
        {
            var game = await _context.Games
                .Include(g => g.Brands)
                .FirstOrDefaultAsync(g => g.GameID == id);

            if (game == null)
            {
                return NotFound();
            }

            var brands = game.Brands.Select(brand => new BrandDTO
            {
                BrandID = brand.BrandID,
                Name = brand.Name,
                // Initialize other properties as needed
            });

            return Ok(brands);
        }



        //Create a game
        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame([FromBody] Game game)
        {
            if (game == null)
            {
                return BadRequest("Invalid game data."); // Return a 400 Bad Request response if the game data is invalid.
            }

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGameById), new { id = game.GameID }, game); // Return a 201 Created response with the newly created game.
        }


    }
}
