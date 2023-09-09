using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PlayPalace_backend.Models
{
    public class Game
    {
        public int GameID { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Year { get; set; }

        [Required]
        public string Director { get; set; }

        [Required]
        public string Producer { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public ICollection<Brand> Brands { get; set; }
        
        [JsonIgnore]
        public ICollection<Rental> Rentals { get; set; }
        public ICollection<MainCharacter> MainCharacters { get; set; }
        public ICollection<Platform> Platforms { get; set; }

    }
}
