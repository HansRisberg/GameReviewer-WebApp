using GameReviewer.DataAccess.GameDbContext;

namespace GameReviewer.DataAccess
{
    public static class EfMethods
    {
        /// <summary>
        /// This clears all the data previously added to the database. (Including all data sent from frontend - Remove later)
        /// </summary>
        public static void ClearAllData()
        {
            using (GameReviewerDbContext db = new())
            {
                //TODO: See if you can get Cascading delete to work. For now this works to remove all data.
                db.RemoveRange(db.Games);
                db.RemoveRange(db.Reviewers);
                db.RemoveRange(db.Categories);
                db.RemoveRange(db.GameCategories);
                db.RemoveRange(db.GameReviews);

                // Restart IDENTITY counting at 1 for tables with auto-incrementing PKs
                db.ResetIdentityStartingValue("Games");
                db.ResetIdentityStartingValue("Categories");
                db.ResetIdentityStartingValue("GameCategories");
                db.ResetIdentityStartingValue("GameReviews");
                db.ResetIdentityStartingValue("Reviewers");

                db.SaveChanges();


            }
        }

    }
}

