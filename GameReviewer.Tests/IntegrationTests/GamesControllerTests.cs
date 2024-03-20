using GameReviewer.DataAccess.DTOs;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using System.Net;
using System.Text;


namespace GameReviewer.Tests.Controllers
{
    public class GamesControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public GamesControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task AddGame_ValidInput_ReturnsSuccessStatusCode()
        {
            // Arrange
            var gameInput = new GameInputDTO
            {
                Title = "Test Game",
                ReleaseDate = DateTime.Now,
                PGRating = PGRating.PG, // Assign a single value from the PGRating enum
                Genres = new List<string> { "Action", "Adventure" } // Assuming genres exist in the database
            };

            var content = new StringContent(JsonConvert.SerializeObject(gameInput), Encoding.UTF8, "application/json");

            // Create an instance of HttpClient using the WebApplicationFactory's server handler
            using var client = _factory.CreateClient();

            // Act
            var response = await client.PostAsync("/api/Games/add-game", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

    }
}
