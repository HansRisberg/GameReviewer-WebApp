using Microsoft.EntityFrameworkCore;

namespace GameReviewer.DataAccess.Models
{
    public class GameReview
    {
        public int GameReviewId { get; set; }
        public int GameId { get; set; }
        public Game? Game { get; set; }

        public int ReviewerId { get; set; }
        public Reviewer? Reviewer { get; set; }

        public string ReviewContent { get; set; } = string.Empty;
        // Other review-related properties...

        // Date, rating, or other review-specific properties can be added here.

        protected static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameReview>()
                .HasKey(gr => gr.GameReviewId);

            modelBuilder.Entity<GameReview>()
                .HasOne(gr => gr.Game)
                .WithMany(g => g.GameReviews)
                .HasForeignKey(gr => gr.GameId);

            modelBuilder.Entity<GameReview>()
                .HasOne(gr => gr.Reviewer)
                .WithMany(r => r.GameReviews)
                .HasForeignKey(gr => gr.ReviewerId);


        }
    }
}
