using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly GameReviewerDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly UserManager<Reviewer> _userManager;

    public ReviewsController(GameReviewerDbContext dbContext, IConfiguration configuration, UserManager<Reviewer> userManager)
    {
        _dbContext = dbContext;
        _configuration = configuration;
        _userManager = userManager;
    }

    private async Task<Reviewer> GetAuthenticatedUserAsync()
    {
        // Retrieve the JWT token from the Authorization header
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token == null)
        {
            return null;
        }

        // Retrieve the JWT secret key from the configuration
        var jwtKey = _configuration["Jwt:SecretKey"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var jwtAudience = _configuration["Jwt:Audience"];

        // Set up token validation parameters
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey))
        };

        try
        {
            // Decode and validate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

            // Extract email address from the token claims
            var email = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }

            // Retrieve the reviewer using the email claim
            return await _userManager.FindByEmailAsync(email);
        }
        catch
        {
            return null;
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("add")]
    public async Task<IActionResult> AddReview([FromBody] AddReviewRequestDTO request)
    {
        // Check for valid review content
        if (string.IsNullOrWhiteSpace(request.ReviewContent))
        {
            return BadRequest("Review content cannot be empty.");
        }

        // Retrieve the authenticated user
        var reviewer = await GetAuthenticatedUserAsync();
        if (reviewer == null)
        {
            return Unauthorized("Invalid token");
        }

        // Check if the game exists
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.GameId == request.GameId);
        if (game == null)
        {
            return NotFound("Game not found.");
        }

        // Create the new review
        var newReview = new GameReview
        {
            GameId = request.GameId,
            ReviewContent = request.ReviewContent,
            ReviewerId = reviewer.Id, // Use the reviewer's ID
            CreatedAt = DateTime.UtcNow
        };

        // Add and save the new review to the database
        _dbContext.GameReviews.Add(newReview);
        await _dbContext.SaveChangesAsync();

        return Created($"api/Reviews/{newReview.GameReviewId}", newReview); // Return the created review
    }

    [HttpGet]
    public async Task<IActionResult> GetReviews()
    {
        try
        {
            var reviews = await _dbContext.GameReviews
                .Include(r => r.Reviewer) // Include reviewer details
                .Include(r => r.Game) // Include game details
                .ToListAsync();

            var reviewDtos = reviews.Select(r => new ReviewDTO
            {
                GameReviewId = r.GameReviewId,
                ReviewContent = r.ReviewContent,
                ReviewerName = r.Reviewer.Name,
                ReviewerEmail = r.Reviewer.Email,
                GameTitle = r.Game.Title,
                GameId = r.GameId,
                CreatedAt = r.CreatedAt
            }).ToList();

            return Ok(reviewDtos);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching reviews: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetReviewsByGameId(int id)
    {
        try
        {
            var reviews = await _dbContext.GameReviews
                .Include(r => r.Reviewer) // Include reviewer details
                .Include(r => r.Game) // Include game details
                .Where(r => r.GameId == id)
                .ToListAsync();

            var reviewDtos = reviews.Select(r => new ReviewDTO
            {
                GameReviewId = r.GameReviewId,
                ReviewContent = r.ReviewContent,
                ReviewerName = r.Reviewer.Name,
                ReviewerEmail = r.Reviewer.Email,
                GameTitle = r.Game.Title,
                GameId = r.GameId,
                CreatedAt = r.CreatedAt
            }).ToList();

            return Ok(reviewDtos);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching reviews: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("user-reviews")]
    public async Task<IActionResult> GetUserReviews()
    {
        try
        {
            var user = await GetAuthenticatedUserAsync();
            if (user == null)
            {
                return Unauthorized("Invalid token");
            }

            var reviews = await _dbContext.GameReviews
                .Where(r => r.ReviewerId == user.Id) // Filter by current user's ID
                .Include(r => r.Reviewer) // Include reviewer details
                .Include(r => r.Game) // Include game details
                .ToListAsync();

            var reviewDtos = reviews.Select(r => new ReviewDTO
            {
                GameReviewId = r.GameReviewId,
                ReviewContent = r.ReviewContent,
                ReviewerName = r.Reviewer.Name,
                ReviewerEmail = r.Reviewer.Email,
                GameTitle = r.Game.Title,
                GameId = r.GameId,
                CreatedAt = r.CreatedAt
            }).ToList();

            return Ok(reviewDtos);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching user reviews: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
}
