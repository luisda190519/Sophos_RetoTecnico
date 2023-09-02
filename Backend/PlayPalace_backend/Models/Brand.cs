namespace PlayPalace_backend.Models
{
    public class Brand
    {
        public int BrandID { get; set; }
        public String Name { get; set; }
        public ICollection<Game> Games { get; set; }

    }
}
