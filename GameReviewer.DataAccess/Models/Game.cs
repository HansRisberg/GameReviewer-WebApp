namespace GameReviewer.DataAccess.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime ReleaseDate { get; set; }

        public PGRating PGRating { get; set; } = new PGRating();
        // Other properties...

        public ICollection<GameReview>? GameReviews { get; set; }
        public ICollection<GameCategory>? GameCategories { get; set; }
    }
}
