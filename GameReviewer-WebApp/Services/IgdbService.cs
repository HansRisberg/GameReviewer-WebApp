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

    public async Task<string> FetchGameDetailAsync(int gameId)
    {
        var token = await GetAccessTokenAsync();
        var apiUrl = "https://api.igdb.com/v4/games"; // Endpoint to fetch all information for a specific game
        //var requestData = $"fields *, genres.name, keywords.name, screenshots.*; where id = {gameId};"; // Specify the fields and the game's ID
        var requestData = $"fields *, genres.name, keywords.name, screenshots.*, involved_companies.*, involved_companies.company.name; where id = {gameId};";

        var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
        request.Headers.Add("Client-ID", _configuration["Igdb:ClientId"]);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent(requestData, System.Text.Encoding.UTF8, "application/json");

        Console.WriteLine("Sending request to IGDB API: " + requestData); // Log the request data

        var response = await _httpClient.SendAsync(request);

        // Ensure the response is successful
        if (!response.IsSuccessStatusCode)
        {
            Console.WriteLine("Failed to fetch data from IGDB API. Status: " + response.StatusCode);
            response.EnsureSuccessStatusCode();
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Received response from IGDB API: " + responseContent); // Log the response content

        return responseContent;
    }






}
