using GameReviewer.DataAccess.Models;

namespace GameReviewer.DataAccess.DTOs
{
    public class GameInputDTO
    {

        public required string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public PGRating PGRating { get; set; }
        public string CategoryName { get; set; } = "Other";
    }
}
