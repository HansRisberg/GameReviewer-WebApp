using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameReviewer_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly GameReviewerDbContext _context;

        public GenresController(GameReviewerDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// This Get method is used to sort the list of games from a category dropdown menu in frontend. 
        /// </summary>
        /// <returns></returns>
        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {
            var categories = await _context.Genres
                .Include(c => c.GameGenre!)
                .ThenInclude(gc => gc.Game)
                .ToListAsync();

            // Optionally, we can shape the result to include only the necessary data
            var shapedCategories = categories.Select(c => new Genre
            {
                GenreId = c.GenreId,
                Name = c.Name,
                // Other properties you want to include...
                GameGenre = c.GameGenre.Select(gc => new GameGenre
                {
                    // Include only the necessary properties from GameCategory...
                    GameId = gc.GameId,
                    GenreId = gc.GenreId
                }).ToList()
            }).ToList();

            return shapedCategories;
        }


        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenre(int id)
        {
            var category = await _context.Genres.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenre(int id, Genre category)
        {
            if (id != category.GenreId)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Genre>> PostGenre(Genre category)
        {
            _context.Genres.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.GenreId }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var category = await _context.Genres.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Genres.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Genres.Any(e => e.GenreId == id);
        }
    }
}
