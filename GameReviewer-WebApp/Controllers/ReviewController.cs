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

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("add")]
    public async Task<IActionResult> AddReview([FromBody] AddReviewRequestDTO request)
    {
        // Check for valid review content
        if (string.IsNullOrWhiteSpace(request.ReviewContent))
        {
            return BadRequest("Review content cannot be empty.");
        }

        // Retrieve the JWT token from the Authorization header
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        if (token == null)
        {
            return Unauthorized("Token is missing.");
        }

        var jwtKey = _configuration["Jwt:SecretKey"];
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidAudience = _configuration["Jwt:Audience"]
        };

        // Validate the JWT token and retrieve the claims principal
        var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);

        // Extract the email claim from the token
        var emailClaim = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
        if (emailClaim == null)
        {
            return Unauthorized("Invalid token: Email claim not found.");
        }

        // Retrieve the reviewer using the email claim
        var reviewer = await _userManager.FindByEmailAsync(emailClaim);
        if (reviewer == null)
        {
            return NotFound("Reviewer not found.");
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
}