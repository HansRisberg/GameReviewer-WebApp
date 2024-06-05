using System.Net.Http.Headers;
using System.Text.Json;

public class IgdbService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public IgdbService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GetAccessTokenAsync()
    {
        var clientId = _configuration["Igdb:ClientId"];
        var clientSecret = _configuration["Igdb:ClientSecret"];
        var tokenUrl = "https://id.twitch.tv/oauth2/token";

        var response = await _httpClient.PostAsync($"{tokenUrl}?client_id={clientId}&client_secret={clientSecret}&grant_type=client_credentials", null);

        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();
        var tokenData = JsonSerializer.Deserialize<JsonElement>(jsonResponse);

        return tokenData.GetProperty("access_token").GetString();
    }

    public async Task<string> FetchGamesAsync()
    {
        var token = await GetAccessTokenAsync();
        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.igdb.com/v4/games");
        request.Headers.Add("Client-ID", _configuration["Igdb:ClientId"]);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent("fields name,genres.name,platforms.name,summary;", System.Text.Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
    public async Task<string> SearchGamesAsync(string query)
    {
        var token = await GetAccessTokenAsync();
        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.igdb.com/v4/search");
        request.Headers.Add("Client-ID", _configuration["Igdb:ClientId"]);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent($"fields *; search \"{query}\"; limit 5;", System.Text.Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
