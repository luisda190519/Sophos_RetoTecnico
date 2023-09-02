namespace PlayPalace_backend.Models
{
    public class Game
    {
        public int GameID { get; set; }
        public string Title { get; set; }
        public DateTime Year { get; set; }
        public string Director { get; set; }
        public string Producer { get; set; }
        public string Platform { get; set; }

        public string ImageUrl { get; set; }

        public int BrandID { get; set; }

        public double Price { get; set; }

        public Brand Brand { get; set; }
        public ICollection<Rental> Rentals { get; set; }
        public ICollection<GameAgeRange> GameAgeRanges { get; set; }
        public ICollection<MainCharacter> MainCharacters { get; set; }
    }
}
