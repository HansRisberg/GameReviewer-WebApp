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
    [HttpGet("search")]
    public async Task<IActionResult> SearchGames([FromQuery] string query)
    {
        try
        {
            var games = await _igdbService.SearchGamesAsync(query);
            return Ok(games);
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

}
