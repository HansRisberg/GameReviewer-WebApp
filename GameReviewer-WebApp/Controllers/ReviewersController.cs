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
    public class ReviewersController : ControllerBase
    {
        private readonly GameReviewerDbContext _context;

        public ReviewersController(GameReviewerDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviewers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reviewer>>> GetReviewers()
        {
            return await _context.Reviewers.ToListAsync();
        }

        // GET: api/Reviewers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reviewer>> GetReviewer(int id)
        {
            var reviewer = await _context.Reviewers.FindAsync(id);

            if (reviewer == null)
            {
                return NotFound();
            }

            return reviewer;
        }

        // PUT: api/Reviewers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReviewer(int id, Reviewer reviewer)
        {
            if (id != reviewer.ReviewerId)
            {
                return BadRequest();
            }

            _context.Entry(reviewer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewerExists(id))
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

        // POST: api/Reviewers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reviewer>> PostReviewer(Reviewer reviewer)
        {
            _context.Reviewers.Add(reviewer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReviewer", new { id = reviewer.ReviewerId }, reviewer);
        }

        // DELETE: api/Reviewers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviewer(int id)
        {
            var reviewer = await _context.Reviewers.FindAsync(id);
            if (reviewer == null)
            {
                return NotFound();
            }

            _context.Reviewers.Remove(reviewer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewerExists(int id)
        {
            return _context.Reviewers.Any(e => e.ReviewerId == id);
        }
    }
}
