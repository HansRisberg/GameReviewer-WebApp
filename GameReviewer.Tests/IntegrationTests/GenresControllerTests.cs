using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;

namespace GameReviewer.Tests.Controllers
{
    public class GenresControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public GenresControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetGenres_ReturnsOk()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/Genres");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetGenreById_ReturnsOk()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Assuming there's at least one genre in the database with GenreId = 1
            var genreId = 1;

            // Act
            var response = await client.GetAsync($"/api/Genres/{genreId}");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        // Add similar test methods for other endpoints like PutGenre, PostGenre, DeleteGenre, etc.
    }
}
