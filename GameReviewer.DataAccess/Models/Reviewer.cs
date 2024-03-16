using Microsoft.AspNetCore.Identity;

namespace GameReviewer.DataAccess.Models
{
    public class Reviewer : IdentityUser
    {
        public int ReviewerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        // Other properties....

        public ICollection<GameReview>? GameReviews { get; set; }
    }
}
