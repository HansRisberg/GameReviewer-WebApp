using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace GameReviewer.DataAccess.GameDbContext
{
    public class GameReviewerDbContextFactory : IDesignTimeDbContextFactory<GameReviewerDbContext>
    {
        public GameReviewerDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<GameReviewerDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=EcommerceDb;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new GameReviewerDbContext(optionsBuilder.Options);
        }
    }
}
