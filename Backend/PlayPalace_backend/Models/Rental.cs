namespace PlayPalace_backend.Models
{
    public class Rental
    {
        public int RentalID { get; set; }
        public int customerID { get; set; }
        public int GameID { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime DueDate { get; set; }
        public Double TotalBalance { get; set; }
        public String PayMethod { get; set; }
        public Boolean Finished { get; set; }

        public Customer Customer { get; set; }
        public Game Game { get; set; }

        public void CalculateRentalPrice()
        {
            if (Game != null)
            {
                TimeSpan rentalPeriod = DueDate - RentalDate;
                int numberOfDays = (int)rentalPeriod.TotalDays;
                TotalBalance = numberOfDays * (Game.Price);
                this.TotalBalance = TotalBalance;
            }
            else
            {
                TotalBalance = 0; 
            }
        }


    }
}
