namespace GameReviewer.DataAccess
{
    public class SeedData
    {
        public static void Initialize()
        {
            //// Clear and seed the database
            //using (var db = new GameReviewerDbContext())
            //{
            //    //EfMethods.ClearAllData(); //Remeber to remove later, this is just for testing purposes
            //    var genres = new List<Genre>
            //    {
            //new Genre { Name = "Action" },
            //        new Genre { Name = "Adventure" },
            //        new Genre { Name = "Battle Royale" },
            //        new Genre { Name = "Card Game" },
            //        new Genre { Name = "Co-op" },
            //        new Genre { Name = "Fighting" },
            //        new Genre { Name = "Horror" },
            //        new Genre { Name = "Indie" },
            //        new Genre { Name = "MMORPG" },
            //        new Genre { Name = "Metroidvania" },
            //        new Genre { Name = "Open World" },
            //        new Genre { Name = "Platformer" },
            //        new Genre { Name = "Puzzle" },
            //        new Genre { Name = "RPG" },
            //        new Genre { Name = "Racing" },
            //        new Genre { Name = "Role-Playing" },
            //        new Genre { Name = "Shooter" },
            //        new Genre { Name = "Simulation" },
            //        new Genre { Name = "Sports" },
            //        new Genre { Name = "Stealth" },
            //        new Genre { Name = "Strategy" },
            //        new Genre { Name = "Survival" },
            //        new Genre { Name = "Tactical" },
            //        new Genre { Name = "Turn-Based Strategy" }
            //    };
            //    db.Genres.AddRange(genres);
            //    db.SaveChanges();
            //};
            // Seed data for the categories, games, reviewers, game reviews, and game categories

            //    var games = new List<Game> //legg til dice dreams og vis banaz.
            //{
            //    new Game { Title = "Warhammer 40k, Darktide", ReleaseDate = new DateTime(2022, 1, 1), PGRating = PGRating.G },
            //    new Game { Title = "Baldurs Gate 3", ReleaseDate = new DateTime(2022, 2, 1), PGRating = PGRating.R13},

            //    // Add more games as needed
            //};

            //    var reviewers = new List<Reviewer>
            //{
            //    new Reviewer { Name = "John Doe", PhoneNumber = "123-456-7890" },
            //    new Reviewer { Name = "Jane Doe", PhoneNumber = "987-654-3210" },
            //    // Add more reviewers as needed
            //};

            //    var gameReviews = new List<GameReview>
            //{
            //    new GameReview { Game = games[0], Reviewer = reviewers[0], ReviewContent = "Great game!" },
            //    new GameReview { Game = games[0], Reviewer = reviewers[1], ReviewContent = "Great game, PS: John is an idiot!" },
            //    new GameReview { Game = games[1], Reviewer = reviewers[1], ReviewContent = "Enjoyed playing it." },
            //    // Add more game reviews as needed
            //};

            //    var gameCategories = new List<GameGenre>
            //{
            //    new GameGenre { Game = games[0], Genre = genres[0] },
            //    new GameGenre { Game = games[0], Genre = genres[1] },
            //    new GameGenre { Game = games[1], Genre = genres[2] },

            //    // Add more game categories as needed
            //};


        }
    }

}
