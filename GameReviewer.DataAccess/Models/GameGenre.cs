using Microsoft.EntityFrameworkCore;

namespace GameReviewer.DataAccess.Models
{
    public class GameGenre
    {
        public int GameId { get; set; }
        public Game? Game { get; set; }

        public int GenreId { get; set; }
        public Genre? Category { get; set; }

        // Other properties related to the association...

        protected static void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameGenre>()
                .HasKey(gc => new { gc.GameId, gc.GenreId });

            modelBuilder.Entity<GameGenre>()
                .HasOne(gc => gc.Game)
                .WithMany(g => g.GameCategories)
                .HasForeignKey(gc => gc.GameId);

            modelBuilder.Entity<GameGenre>()
                .HasOne(gc => gc.Category)
                .WithMany(c => c.GameGenre)
                .HasForeignKey(gc => gc.GenreId);


        }
    }
}
//using Microsoft.EntityFrameworkCore;

//namespace GameReviewer.DataAccess.Models {
//    public class GameCategory {
//        public int GameCategoryId { get; set; } // Add a unique identifier

//        public int GameId { get; set; }
//        public Game? Game { get; set; }

//        public int CategoryId { get; set; }
//        public Category? Category { get; set; }

//        // Other properties related to the association...

//        protected static void OnModelCreating(ModelBuilder modelBuilder) {
//            modelBuilder.Entity<GameCategory>()
//                .HasKey(gc => gc.GameCategoryId); // Set GameCategoryId as the primary key

//            modelBuilder.Entity<GameCategory>()
//                .HasOne(gc => gc.Game)
//                .WithMany(g => g.GameCategories)
//                .HasForeignKey(gc => gc.GameId);

//            modelBuilder.Entity<GameCategory>()
//                .HasOne(gc => gc.Category)
//                .WithMany(c => c.GameCategories)
//                .HasForeignKey(gc => gc.CategoryId);
//        }
//    }
//}
