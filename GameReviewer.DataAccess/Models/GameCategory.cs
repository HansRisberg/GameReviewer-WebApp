using Microsoft.EntityFrameworkCore;

namespace GameReviewer.DataAccess.Models
{
    public class GameCategory
    {
        public int GameId { get; set; }
        public Game? Game { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        // Other properties related to the association...

        protected static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameCategory>()
                .HasKey(gc => new { gc.GameId, gc.CategoryId });

            modelBuilder.Entity<GameCategory>()
                .HasOne(gc => gc.Game)
                .WithMany(g => g.GameCategories)
                .HasForeignKey(gc => gc.GameId);

            modelBuilder.Entity<GameCategory>()
                .HasOne(gc => gc.Category)
                .WithMany(c => c.GameCategories)
                .HasForeignKey(gc => gc.CategoryId);


        }
    }
}
