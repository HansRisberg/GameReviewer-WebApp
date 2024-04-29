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
    public async Task<IActionResult> AddReview([FromBody] AddReviewRequestDTO request, IConfiguration configuration)
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

        // Retrieve the JWT secret key from the configuration
        var jwtKey = configuration["Jwt:SecretKey"];
        var jwtIssuer = configuration["Jwt:Issuer"];
        var jwtAudience = configuration["Jwt:Audience"];

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

        // Decode and validate the token
        var tokenHandler = new JwtSecurityTokenHandler();
        var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

        // Verify the issuer
        bool isIssuerValid = validatedToken.Issuer.Equals(jwtIssuer, StringComparison.InvariantCultureIgnoreCase);
        Console.WriteLine($"Issuer is valid: {isIssuerValid}");

        // Verify the audience
        bool isAudienceValid = ((validatedToken as JwtSecurityToken)?.Audiences?.Any(a => a.Equals(jwtAudience, StringComparison.InvariantCultureIgnoreCase)) ?? false);
        Console.WriteLine($"Audience is valid: {isAudienceValid}");

        // Verify the expiration time
        bool isTokenValid = validatedToken.ValidTo > DateTime.UtcNow;
        Console.WriteLine($"Token expiration is valid: {isTokenValid}");

        // Check if any of the verification steps failed
        if (!isIssuerValid || !isAudienceValid || !isTokenValid)
        {
            return Unauthorized("Invalid token");
        }

        // Check if any of the verification steps failed
        if (!isIssuerValid || !isAudienceValid || !isTokenValid)
        {
            return Unauthorized("Invalid token");
        }

        // Extract email address from the token claims
        var email = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
        Console.WriteLine("The claim email is :" + email);

        // Check if the game exists
        var game = await _dbContext.Games.FirstOrDefaultAsync(g => g.GameId == request.GameId);
        if (game == null)
        {
            return NotFound("Game not found.");
        }
        // Retrieve the reviewer using the email claim
        var reviewer = await _userManager.FindByEmailAsync(email);
        if (reviewer == null)
        {
            return NotFound("Reviewer not found.");
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