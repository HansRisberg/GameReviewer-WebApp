using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;

namespace GameReviewer_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameReviewsController : ControllerBase
    {
        private readonly GameReviewerDbContext _context;

        public GameReviewsController(GameReviewerDbContext context)
        {
            _context = context;
        }

        // GET: api/GameReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameReview>>> GetGameReviews()
        {
            return await _context.GameReviews.ToListAsync();
        }

        // GET: api/GameReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameReview>> GetGameReview(int id)
        {
            var gameReview = await _context.GameReviews.FindAsync(id);

            if (gameReview == null)
            {
                return NotFound();
            }

            return gameReview;
        }

        // PUT: api/GameReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameReview(int id, GameReview gameReview)
        {
            if (id != gameReview.GameReviewId)
            {
                return BadRequest();
            }

            _context.Entry(gameReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameReviewExists(id))
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

        // POST: api/GameReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameReview>> PostGameReview(GameReview gameReview)
        {
            _context.GameReviews.Add(gameReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameReview", new { id = gameReview.GameReviewId }, gameReview);
        }

        // DELETE: api/GameReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameReview(int id)
        {
            var gameReview = await _context.GameReviews.FindAsync(id);
            if (gameReview == null)
            {
                return NotFound();
            }

            _context.GameReviews.Remove(gameReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameReviewExists(int id)
        {
            return _context.GameReviews.Any(e => e.GameReviewId == id);
        }
    }
}
