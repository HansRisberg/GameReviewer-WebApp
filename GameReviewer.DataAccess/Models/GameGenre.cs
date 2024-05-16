using Microsoft.EntityFrameworkCore;

namespace GameReviewer.DataAccess.Models
{
    public class GameGenre
    {
        public int GameId { get; set; }
        public Game? Game { get; set; }

        public int GenreId { get; set; }
        public Genre? Genre { get; set; }

        // Other properties related to the association...

        protected static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameGenre>()
                .HasKey(gc => new { gc.GameId, gc.GenreId });

            modelBuilder.Entity<GameGenre>()
                .HasOne(gc => gc.Game)
                .WithMany(g => g.GameGenres)
                .HasForeignKey(gc => gc.GameId);

            modelBuilder.Entity<GameGenre>()
                .HasOne(gc => gc.Genre)
                .WithMany(c => c.GameGenre)
                .HasForeignKey(gc => gc.GenreId);


        }
    }
}

