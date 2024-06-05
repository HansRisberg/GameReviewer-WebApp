using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class IgdbController : ControllerBase
{
    private readonly IgdbService _igdbService;

    public IgdbController(IgdbService igdbService)
    {
        _igdbService = igdbService;
    }

    [HttpGet("games")]
    public async Task<IActionResult> GetGames()
    {
        try
        {
            var games = await _igdbService.FetchGamesAsync();
            return Ok(games);
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
