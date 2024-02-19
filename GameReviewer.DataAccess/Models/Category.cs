namespace GameReviewer.DataAccess.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;


        // Other properties...

        public ICollection<GameCategory>? GameCategories { get; set; }
    }
}
