// DTOs/ReviewDTO.cs
public class ReviewDTO
{
    public int GameReviewId { get; set; }
    public int GameId { get; set; }
    public string ReviewContent { get; set; }
    public string ReviewerName { get; set; }
    public string ReviewerEmail { get; set; }
    public string GameTitle { get; set; }
    public DateTime? CreatedAt { get; set; }
}
