using Microsoft.AspNetCore.Http;
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

            return Ok(games); // Return a 200 OK response with the list of games containing the main characters.
        }

        //List games by producer or brand
        [HttpGet("byproducer")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByProducer([FromQuery] string producerName)
        {
            var games = await _context.Games
                .Where(game => game.Producer == producerName)
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified producer.");
            }

            return Ok(games);
        }

        [HttpGet("bybrand")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByBrand([FromQuery] string brandName)
        {
            var games = await _context.Games
                .Where(game => game.Brands.Any(brand => brand.Name == brandName))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified brand.");
            }

            return Ok(games);
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
                .Where(game => game.Platforms.Any(platform => platform.Name.Contains(platformName)))
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
            });

            return Ok(platforms);
        }

        // get by id of the main character
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
                ImageURL = mc.ImageURL,
            });

            return Ok(mainCharacters);
        }

        //Get by main character name
        [HttpGet("bymaincharactername")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByMainCharacterName([FromQuery] string characterName)
        {
            var games = await _context.Games
                .Where(game => game.MainCharacters.Any(character => character.Name == characterName))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found for the specified main character name.");
            }

            return Ok(games);
        }


        // Get the brand based on the id
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
            });

            return Ok(brands);
        }

        //get game by name
        [HttpGet("byname")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGamesByName([FromQuery] string gameName)
        {
            var games = await _context.Games
                .Where(game => game.Title.ToLower().Contains(gameName.ToLower()))
                .ToListAsync();

            if (games.Count == 0)
            {
                return NotFound("No games found matching the specified name.");
            }

            return Ok(games);
        }

        [HttpGet("titles-and-prices")]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGamesWithTitlesAndPrices()
        {
            var gamesWithTitlesAndPrices = await _context.Games
                .Select(g => new GameDTO
                {
                    GameID = g.GameID,
                    Title = g.Title,
                    RentalPrice = g.Price
                })
                .ToListAsync();

            return Ok(gamesWithTitlesAndPrices);
        }

        [HttpPut("{id}/changegameprice/{newPrice}")]
        public async Task<ActionResult<Rental>> ChangeGamePrice(int id, double newPrice)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound("Rental not found."); // Return a 404 Not Found response if the rental is not found.
            }

            if (game.Price != null)
            {
                game.Price = newPrice;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(game); // Return a 200 OK response with the updated rental data.
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update rental.");
            }
        }

        [HttpGet("GetBrandById/{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound("Brand not found.");
            }

            return Ok(brand);
        }

        [HttpGet("GetPlatformById/{id}")]
        public async Task<ActionResult<Platform>> GetPlatformById(int id)
        {
            var platform = await _context.Platforms.FindAsync(id);

            if (platform == null)
            {
                return NotFound("Platform not found.");
            }

            return Ok(platform);
        }

        [HttpPost("CreateBrand")]
        public async Task<ActionResult<Brand>> CreateBrand([FromBody] BrandDTO brandDTO)
        {
            if (brandDTO == null)
            {
                return BadRequest("Invalid brand data.");
            }

            var brand = new Brand
            {
                Name = brandDTO.Name
            };

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBrandById), new { id = brand.BrandID }, brand);
        }

        [HttpPost("CreatePlatform")]
        public async Task<ActionResult<Platform>> CreatePlatform([FromBody] PlatformDTO platformDTO)
        {
            if (platformDTO == null)
            {
                return BadRequest("Invalid platform data.");
            }

            var platform = new Platform
            {
                Name = platformDTO.Name
            };

            _context.Platforms.Add(platform);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlatformById), new { id = platform.PlatformID }, platform);
        }

        [HttpGet("maincharacters/game/{id}")]
        public async Task<ActionResult<MainCharacterDTO>> GetMainCharacterById(int id)
        {
            var mainCharacter = await _context.MainCharacters.FindAsync(id);

            if (mainCharacter == null)
            {
                return NotFound("Main character not found.");
            }

            var mainCharacterDTO = new MainCharacterDTO
            {
                MainCharacterID = mainCharacter.CharacterID,
                Name = mainCharacter.Name,
                ImageURL = mainCharacter.ImageURL,
                GameID = mainCharacter.Game.GameID // Include GameID in the response
            };

            return Ok(mainCharacterDTO);
        }


        [HttpPost("createmaincharacter")]
        public async Task<ActionResult<MainCharacterDTO>> CreateMainCharacter([FromBody] MainCharacterDTO mainCharacterDTO)
        {
            if (mainCharacterDTO == null)
            {
                return BadRequest("Invalid main character data.");
            }

            var game = await _context.Games.FindAsync(mainCharacterDTO.GameID);

            if (game == null)
            {
                return NotFound("Game not found."); 
            }

            var mainCharacter = new MainCharacter
            {
                Name = mainCharacterDTO.Name,
                ImageURL = mainCharacterDTO.ImageURL,
                Game = game // Link the MainCharacter to the existing Game
            };

            _context.MainCharacters.Add(mainCharacter);
            await _context.SaveChangesAsync();

            // Convert the created MainCharacter to MainCharacterDTO and return it
            var createdMainCharacterDTO = new MainCharacterDTO
            {
                MainCharacterID = mainCharacter.CharacterID,
                Name = mainCharacter.Name,
                ImageURL = mainCharacter.ImageURL,
                GameID = mainCharacter.Game.GameID
            };

            return CreatedAtAction(nameof(GetMainCharacterById), new { id = createdMainCharacterDTO.MainCharacterID }, createdMainCharacterDTO);
        }

        [HttpPost("CreateGame")]
        public async Task<ActionResult<Game>> CreateGame([FromBody] GameDTO2 gameDTO)
        {
            if (gameDTO == null)
            {
                return BadRequest("Invalid game data.");
            }

            // Create a new Game instance and map properties from the DTO
            var game = new Game
            {
                Title = gameDTO.Title,
                Year = new DateTime(gameDTO.Year, 1, 1), // Assuming year is an integer representing the year
                Director = gameDTO.Director,
                Producer = gameDTO.Producer,
                ImageUrl = gameDTO.ImageUrl,
                Price = gameDTO.Price,
                Description = gameDTO.Description,
            };

            // Retrieve platforms by their IDs
            if (gameDTO.PlatformIds != null && gameDTO.PlatformIds.Count > 0)
            {
                game.Platforms = await _context.Platforms.Where(p => gameDTO.PlatformIds.Contains(p.PlatformID)).ToListAsync();
            }

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGameById), new { id = game.GameID }, game);
        }


        [HttpGet("platforms")]
        public async Task<ActionResult<IEnumerable<Platform>>> GetPlatforms()
        {
            // Retrieve all platforms
            var platforms = await _context.Platforms.ToListAsync();

            if (platforms == null || platforms.Count == 0)
            {
                return NotFound("No platforms found.");
            }

            return Ok(platforms);
        }

    }
}
