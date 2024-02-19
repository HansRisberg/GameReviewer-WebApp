namespace GameReviewer.DataAccess.Models
{
    public class Reviewer
    {
        public int ReviewerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string EMail { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        // Other properties....

        public ICollection<GameReview>? GameReviews { get; set; }
    }
}
