namespace GameReviewer.DataAccess.DTOs
{
    public class UserProfileUpdateDTO
    {
        public string UserId { get; set; } // Id of the user whose profile is being updated
        public string Name { get; set; } // Updated name
        public string PhoneNumber { get; set; } // Updated phone number
    }
}
