namespace PlayPalace_backend.DTO
{
    public class RentalDTO
    {
        public int CustomerID { get; set; }
        public int GameID { get; set; }
        public DateTime DueDate { get; set; }
        public string PayMethod { get; set; }
    }
}
