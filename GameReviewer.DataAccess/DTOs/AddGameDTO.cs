using GameReviewer.DataAccess.Models;

namespace GameReviewer.DataAccess.DTOs
{
    public class AddGameDTO
    {
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public PGRating PGRating { get; set; }
        public List<string> Genres { get; set; } = new List<string> { "Other" }; // Default to "Other" if no genres are provided
    }

}
