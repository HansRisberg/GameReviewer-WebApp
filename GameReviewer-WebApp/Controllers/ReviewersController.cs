using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<Reviewer> userManager;
    private readonly SignInManager<Reviewer> signInManager;

    public AccountController(UserManager<Reviewer> userManager, SignInManager<Reviewer> signInManager)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequest)
    {
        if (ModelState.IsValid)
        {
            var user = new Reviewer
            {
                UserName = registerRequest.Email,
                Email = registerRequest.Email,
                Name = registerRequest.Name,
                // Other properties...
            };

            var result = await userManager.CreateAsync(user, registerRequest.Password);

            if (result.Succeeded)
            {
                // Automatically sign in the user after registration
                await signInManager.SignInAsync(user, isPersistent: false);

                // You can customize the response data here
                var responseData = new
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Name = user.Name
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
}
