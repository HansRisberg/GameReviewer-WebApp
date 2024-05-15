using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace GameReviewer.DataAccess.GameDbContext
{
    public class GameReviewerDbContext : IdentityDbContext<Reviewer>
    {
        private readonly IConfiguration _configuration;
        /// <summary>
        /// A constructor for SeedData to work.
        /// </summary>
        public GameReviewerDbContext(DbContextOptions<GameReviewerDbContext> options, IConfiguration configuration)
        : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Game> Games => Set<Game>();
        public DbSet<Genre> Genres => Set<Genre>();
        public DbSet<GameGenre> GameGenres => Set<GameGenre>();
        public DbSet<GameReview> GameReviews => Set<GameReview>();
        public DbSet<Reviewer> Reviewers => Set<Reviewer>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    _configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly("GameReviewer.DataAccess")); // Specify the migrations assembly here
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Call the base method to configure ASP.NET Core Identity entities

            // Configure primary key for IdentityUserLogin<string> entity
            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
            });
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
