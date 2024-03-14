namespace GameReviewer.DataAccess.Models
{
    public class Genre
    {
        public int GenreId { get; set; }
        public string Name { get; set; } = string.Empty;


        // Other properties...

        public ICollection<GameGenre>? GameGenre { get; set; }
    }
}
