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
        [HttpGet("pgratings")] //Do I need this? 
        public ActionResult<IEnumerable<string>> GetAvailablePGRatings()
        {
            var availablePGRatings = Enum.GetNames(typeof(PGRating));
            return Ok(availablePGRatings);
        }
        //GET: api/Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.GameCategories)
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

        // POST: api/Games
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            _context.Games.Add(game);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.GameId }, game);
        }

        //[HttpPost]
        //public async Task<ActionResult<Game>> PostGame(Game game)
        //{
        //    // Create or retrieve the category based on game.GameCategories
        //    game.GameCategories = new List<GameCategory>
        //{
        //    new GameCategory
        //    {
        //        Category = new Category { Name = game.GameCategories.First().Category.Name }
        //    }
        //};

        //    _context.Games.Add(game);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetGame", new { id = game.GameId }, game);
        //}


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
