namespace PlayPalace_backend.Models
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public int RentalID { get; set; }
        public DateTime TransactionDate { get; set; }

        public Rental Rental { get; set; }
    }
}
