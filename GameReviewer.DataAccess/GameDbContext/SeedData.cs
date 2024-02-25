using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;


namespace GameReviewer.DataAccess
{
    public class SeedData
    {
        public static void Initialize()
        {
            // Seed data for the categories, games, reviewers, game reviews, and game categories
            var categories = new List<Category>
        {
            new Category { Name = "Action" },
            new Category { Name = "Adventure" },
            new Category { Name = "Role-Playing" },
            // Add more categories as needed
        };

            var games = new List<Game>
        {
            new Game { Title = "Warhammer 40k, Darktide", ReleaseDate = new DateTime(2022, 1, 1), PGRating = PGRating.G },
            new Game { Title = "Baldurs Gate 3", ReleaseDate = new DateTime(2022, 2, 1), PGRating = PGRating.R13},
            // Add more games as needed
        };

            var reviewers = new List<Reviewer>
        {
            new Reviewer { Name = "John Doe", EMail = "john@example.com", PhoneNumber = "123-456-7890" },
            new Reviewer { Name = "Jane Doe", EMail = "jane@example.com", PhoneNumber = "987-654-3210" },
            // Add more reviewers as needed
        };

            var gameReviews = new List<GameReview>
        {
            new GameReview { Game = games[0], Reviewer = reviewers[0], ReviewContent = "Great game!" },
            new GameReview { Game = games[1], Reviewer = reviewers[1], ReviewContent = "Enjoyed playing it." },
            // Add more game reviews as needed
        };

            var gameCategories = new List<GameCategory>
        {
            new GameCategory { Game = games[0], Category = categories[0] },
            new GameCategory { Game = games[0], Category = categories[1] },
            new GameCategory { Game = games[1], Category = categories[2] },
            // Add more game categories as needed
        };

            // Clear and seed the database
            using (var db = new GameReviewerDbContext())
            {
                EfMethods.ClearAllData(); //Remeber to remove later, this is just for testing purposes
                db.Categories.AddRange(categories);
                db.Games.AddRange(games);
                db.Reviewers.AddRange(reviewers);
                db.GameReviews.AddRange(gameReviews);
                db.GameCategories.AddRange(gameCategories);

                // Restart IDENTITY counting at 1 for tables with auto-incrementing PKs
                db.ResetIdentityStartingValue("Games");
                db.ResetIdentityStartingValue("Categories");
                db.ResetIdentityStartingValue("GameCategories");
                db.ResetIdentityStartingValue("GameReviews");
                db.ResetIdentityStartingValue("Reviewers");

                db.SaveChanges();
            }
        }
    }

}
