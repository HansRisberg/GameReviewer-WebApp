﻿using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace GameReviewer_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : Controller
    {
        private readonly GameReviewerDbContext _context;

        public GamesController(GameReviewerDbContext context)
        {
            _context = context;
        }
        //TODO: Check if you need this method, if not then delete.
        [HttpGet("pgratings")]
        public ActionResult<IEnumerable<string>> GetAvailablePGRatings()
        {

            var availablePGRatings = Enum.GetNames(typeof(PGRating));
            return Ok(availablePGRatings);
        }
        /// <summary>
        /// This Get method is used to render a list of games. 
        /// </summary>
        /// <returns></returns>
        //GET: api/Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGames([FromQuery] string category = "All categories")
        {
            var queryable = _context.Games
                .Include(g => g.GameCategories)
                .ThenInclude(gc => gc.Category)
                .AsQueryable();

            if (category != "All categories")
            {
                // Filter games based on the specified category
                queryable = queryable.Where(g => g.GameCategories.Any(gc => gc.Category.Name == category));
            }

            var games = await queryable.ToListAsync();

            var gameDtos = games.Select(game => new GameDTO
            {
                GameId = game.GameId,
                Title = game.Title,
                ReleaseDate = game.ReleaseDate,
                PgRating = game.PGRating.ToString(),
                Categories = game.GameCategories.Select(gc => gc.Category.Name).ToList()
            });

            return Ok(gameDtos);
        }

        /// This Get method by Id is for the clickable links in the GameListView.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //GET: api/Game{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.GameCategories)
                    .ThenInclude(gc => gc.Category)
                .Include(g => g.GameReviews)
                    .ThenInclude(gr => gr.Reviewer)
                .FirstOrDefaultAsync(g => g.GameId == id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        // PUT: api/Games/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, Game game)
        {
            if (id != game.GameId)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("add-game")]
        public IActionResult AddGame([FromBody] GameInputDTO gameInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Log values for debugging
            Console.WriteLine($"Received Game Input: {JsonConvert.SerializeObject(gameInput)}");

            // Create game entity without setting GameId manually
            var game = new Game
            {
                Title = gameInput.Title,
                ReleaseDate = gameInput.ReleaseDate,
                PGRating = gameInput.PGRating,
                GameCategories = new List<GameGenre>()
            };

            foreach (var categoryName in gameInput.Categories)
            {
                // Assuming the categories provided already exist in the database
                var category = _context.Genres.FirstOrDefault(c => c.Name == categoryName);

                if (category != null)
                {
                    // Add the category to the game
                    game.GameCategories.Add(new GameGenre { Category = category });
                }
                // Log a warning if the category is not found (this can be adjusted based on your needs)
                else
                {
                    Console.WriteLine($"Warning: Category '{categoryName}' not found in the database.");
                }
            }

            // Log the new game for debugging
            Console.WriteLine($"New Game Created: {JsonConvert.SerializeObject(game)}");

            try
            {
                // Save the new game to the database
                _context.Games.Add(game);
                _context.SaveChanges();

                // Log success message for debugging
                Console.WriteLine("Game added successfully");

                return Ok("Game added successfully");
            }
            catch (Exception ex)
            {
                // Log exception details for debugging
                Console.WriteLine($"Error adding game: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameExists(int id)
        {
            return _context.Games.Any(e => e.GameId == id);
        }
    }
}
