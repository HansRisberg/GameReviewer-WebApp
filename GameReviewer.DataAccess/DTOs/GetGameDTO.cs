namespace GameReviewer.DataAccess.DTOs
{
    public class GetGameDTO
    {
        public int GameId { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PgRating { get; set; }
        public List<string> Genres { get; set; }

        //TODO : Fix nullables/default values
    }
}
