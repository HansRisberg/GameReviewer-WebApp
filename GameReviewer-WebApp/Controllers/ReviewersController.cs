using GameReviewer.DataAccess.Authentication;
using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        Console.WriteLine("Received token in GetProfile endpoint:", token);

        var user = await _userManager.GetUserAsync(User);
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
    //}
    //[HttpGet("profile")]
    //public async Task<IActionResult> GetProfile()
    //{
    //    // Get the current user's ID
    //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    //    // Retrieve the user from the database using the user ID
    //    var user = await _userManager.FindByIdAsync(userId);

    //    if (user == null)
    //    {
    //        return NotFound(); // User not found
    //    }

    //    // Return user information including the ID
    //    var profileData = new
    //    {
    //        user.Id,
    //        user.UserName,
    //        user.Email,
    //        user.Name
    //        // Add other properties as needed
    //    };

    //    return Ok(profileData);
    //}


    //[Authorize]
    //[HttpPut("profile")]
    //public async Task<IActionResult> UpdateProfile([FromBody] UserProfileUpdateDTO profileUpdate)
    //{
    //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    //    if (userId == null)
    //    {
    //        return Unauthorized(); // User not authenticated
    //    }

    //    var user = await _userManager.FindByIdAsync(userId);

    //    if (user == null)
    //    {
    //        return NotFound(); // User not found
    //    }

    //    // Check if the authenticated user is the owner of the profile
    //    if (userId != profileUpdate.UserId)
    //    {
    //        return Forbid(); // User is not allowed to update another user's profile
    //    }

    //    // Update user profile information
    //    user.Name = profileUpdate.Name;
    //    // Update other properties as needed

    //    var result = await _userManager.UpdateAsync(user);

    //    if (result.Succeeded)
    //    {
    //        return Ok(); // Profile updated successfully
    //    }
    //    else
    //    {
    //        return BadRequest(result.Errors); // Error occurred while updating profile
    //    }



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
