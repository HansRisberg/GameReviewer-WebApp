using GameReviewer.DataAccess.Authentication;
using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        // You may want to perform additional logout logic here, such as invalidating any tokens

        // Return a successful response
        return Ok();
    }

}
