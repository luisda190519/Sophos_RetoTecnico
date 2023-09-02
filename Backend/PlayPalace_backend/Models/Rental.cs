namespace PlayPalace_backend.Models
{
    public class Rental
    {
        public int RentalID { get; set; }
        public int CustomerID { get; set; }
        public int GameID { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime DueDate { get; set; }
        public Double Price { get; set; }
        public String PayMethod { get; set; }
        public Boolean Finished { get; set; }

        public Customer Customer { get; set; }
        public Game Game { get; set; }
    
    }
}
