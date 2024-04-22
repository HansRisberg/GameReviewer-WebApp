using GameReviewer.DataAccess.Authentication;
using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<Reviewer> _userManager;
    private readonly SignInManager<Reviewer> _signInManager;
    private readonly JwtTokenGenerator _jwtTokenGenerator;


    public AccountController(UserManager<Reviewer> userManager, SignInManager<Reviewer> signInManager, JwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenGenerator = jwtTokenGenerator;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequest)
    {
        if (ModelState.IsValid)
        {
            var user = new Reviewer
            {
                UserName = registerRequest.Email, //Add an actual username or use email as login name? 
                Email = registerRequest.Email,
                Name = registerRequest.Name,
                // Other properties...
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            if (result.Succeeded)
            {
                // Automatically sign in the user after registration
                await _signInManager.SignInAsync(user, isPersistent: false);

                // Customize the response data here
                var responseData = new
                {
                    UserId = user.Id,
                    user.UserName,
                    user.Email,
                    user.Name
                    // Add other properties you want to include in the response
                };

                // Return a 200 OK response with the meaningful data
                return Ok(responseData);
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        // Return a 400 Bad Request response with the validation errors
        return BadRequest(ModelState);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile([FromServices] IConfiguration configuration)
    {
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

        // Extract token from the Authorization header
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        Console.WriteLine("Received token in GetProfile endpoint:" + token);

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

        // Retrieve the user by email
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return NotFound(); // User not found
        }

        var profileData = new
        {
            user.Id,
            user.UserName,
            user.Email,
            user.Name
        };
        return Ok(profileData);
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
    {
        var result = await _signInManager.PasswordSignInAsync(loginRequest.Email, loginRequest.Password, false, false);

        if (result.Succeeded)
        {
            // Generate and return JWT token
            var token = _jwtTokenGenerator.GenerateJwtToken(loginRequest.Email);

            return Ok(new { token });
        }

        return Unauthorized();
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        // Sign out the user
        await _signInManager.SignOutAsync();

        // TODO: Invalidate the JWT on logout


        return Ok();
    }

}
