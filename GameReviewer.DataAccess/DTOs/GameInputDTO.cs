using GameReviewer.DataAccess.Models;

namespace GameReviewer.DataAccess.DTOs
{
    public class GameInputDTO
    {
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public PGRating PGRating { get; set; }
        public List<string> Categories { get; set; } = new List<string> { "Other" }; // Default to "Other" if no categories provided
    }

}
