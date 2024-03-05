using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var games = await _context.Games
                .Include(g => g.GameCategories!)
                    .ThenInclude(gc => gc.Category)
                .ToListAsync();

            return games;
        }
        /// <summary>
        /// This Get method by Id is for the clickable links in the GameListView.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //GET: api/Game{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.GameCategories!) // ignoring nullable warning
                .ThenInclude(gc => gc.Category)
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

        /// <summary>
        /// This Post method accepts input from a form in frontend and adds the game to the database. 
        /// </summary>
        /// <param name="gameInput"></param>
        /// <returns></returns>
        [HttpPost("add-game")]
        public IActionResult AddGame([FromBody] GameInputDTO gameInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the category already exists
            var category = _context.Categories.FirstOrDefault(c => c.Name == gameInput.CategoryName);

            if (category == null)
            {
                // If category does not exist, create it
                category = new Category { Name = gameInput.CategoryName };
                _context.Categories.Add(category); // Add the new category to the context
            }

            // Create game entity
            var game = new Game
            {
                Title = gameInput.Title,
                ReleaseDate = gameInput.ReleaseDate,
                PGRating = gameInput.PGRating,
                GameCategories = new List<GameCategory> // Ensure GameCategories is initialized
        {
            new GameCategory
            {
                Category = category
            }
        }
                // Add other properties if needed
            };

            // Save to the database
            _context.Games.Add(game);
            _context.SaveChanges();

            return Ok("Game added successfully");
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
