using GameReviewer.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Reflection;

namespace GameReviewer.DataAccess.GameDbContext
{
    public class GameReviewerDbContext : DbContext
    {
        public GameReviewerDbContext(DbContextOptions<GameReviewerDbContext> options) : base(options)
        {
        }
        public DbSet<Game> Games => Set<Game>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<GameCategory> GameCategories => Set<GameCategory>();
        public DbSet<GameReview> GameReviews => Set<GameReview>();
        public DbSet<Reviewer> Reviewers => Set<Reviewer>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                 @"Server = (localdb)\MSSQLLocalDB; " +
                 "Database = GameReviewerDBWebApp; " +
                "Trusted_Connection = True;",
                 b => b.MigrationsAssembly("GameReviewer.DataAccess")); // Specify the migrations assembly here
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                MethodInfo? method = entityType.ClrType.GetMethod("OnModelCreating",
                BindingFlags.Static | BindingFlags.NonPublic);
                if (method != null)
                {
                    method.Invoke(null, new object[] { modelBuilder });
                }
            }
        }

        // Helper method to reseed Identity columns (PKs with autoincrement values) to startingValue
        // (defaults to 1). SQL-inspiration for this methods' content:
        // https://stackoverflow.com/questions/472578/dbcc-checkident-sets-identity-to-0/13303429#13303429
        public void ResetIdentityStartingValue(string tableName, int startingValue = 1)
        {
            Database.ExecuteSqlRaw("IF EXISTS(SELECT * FROM sys.identity_columns " +
            $"WHERE OBJECT_NAME(OBJECT_ID) = '{tableName}' AND last_value IS NOT NULL) " +
            $"DBCC CHECKIDENT({tableName}, RESEED, {startingValue - 1});");
        }
    }
}
