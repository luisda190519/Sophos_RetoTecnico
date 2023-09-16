namespace PlayPalace_backend.DTO
{
    public class RentalWithGameTitle
    {
        public int RentalID { get; set; }
        public int customerID { get; set; }
        public int GameID { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime DueDate { get; set; }
        public double TotalBalance { get; set; }
        public string PayMethod { get; set; }
        public bool Finished { get; set; }
        public string GameTitle { get; set; }
    }
}
