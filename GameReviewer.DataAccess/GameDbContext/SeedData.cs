﻿using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;


namespace GameReviewer.DataAccess
{
    public class SeedData
    {
        public static void Initialize()
        {
            // Seed data for the categories, games, reviewers, game reviews, and game categories
            var genres = new List<Genre>
        {
            new Genre { Name = "Action" },
            new Genre { Name = "Adventure" },
            new Genre { Name = "Role-Playing" },
            new Genre { Name = "Strategy"}
            // Add more categories as needed
        };

            var games = new List<Game> //legg til dice dreams og vis banaz.
        {
            new Game { Title = "Warhammer 40k, Darktide", ReleaseDate = new DateTime(2022, 1, 1), PGRating = PGRating.G },
            new Game { Title = "Baldurs Gate 3", ReleaseDate = new DateTime(2022, 2, 1), PGRating = PGRating.R13},
            
            // Add more games as needed
        };

            var reviewers = new List<Reviewer>
        {
            new Reviewer { Name = "John Doe", PhoneNumber = "123-456-7890" },
            new Reviewer { Name = "Jane Doe", PhoneNumber = "987-654-3210" },
            // Add more reviewers as needed
        };

            var gameReviews = new List<GameReview>
        {
            new GameReview { Game = games[0], Reviewer = reviewers[0], ReviewContent = "Great game!" },
            new GameReview { Game = games[0], Reviewer = reviewers[1], ReviewContent = "Great game, PS: John is an idiot!" },
            new GameReview { Game = games[1], Reviewer = reviewers[1], ReviewContent = "Enjoyed playing it." },
            // Add more game reviews as needed
        };

            var gameCategories = new List<GameGenre>
        {
            new GameGenre { Game = games[0], Genre = genres[0] },
            new GameGenre { Game = games[0], Genre = genres[1] },
            new GameGenre { Game = games[1], Genre = genres[2] },
            
            // Add more game categories as needed
        };

            // Clear and seed the database
            using (var db = new GameReviewerDbContext())
            {
                EfMethods.ClearAllData(); //Remeber to remove later, this is just for testing purposes
                db.Genres.AddRange(genres);
                db.Games.AddRange(games);
                db.Reviewers.AddRange(reviewers);
                db.GameReviews.AddRange(gameReviews);
                db.GameGenres.AddRange(gameCategories);

                // Restart IDENTITY counting at 1 for tables with auto-incrementing PKs
                db.ResetIdentityStartingValue("Games");
                db.ResetIdentityStartingValue("Genres");
                db.ResetIdentityStartingValue("GameGenres");
                db.ResetIdentityStartingValue("GameReviews");
                db.ResetIdentityStartingValue("Reviewers");

                db.SaveChanges();
            }
        }
    }

}
