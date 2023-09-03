namespace PlayPalace_backend.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Cellphone { get; set; }
        public String Gender { get; set; }
        public string DocumentType { get; set; }
        public int YearOfBirth { get; set; }
        public ICollection<Rental> Rentals { get; set; }
    }
}
