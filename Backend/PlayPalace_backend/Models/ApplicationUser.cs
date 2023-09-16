using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PlayPalace_backend.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Cellphone { get; set; }

        public String Gender { get; set; }

        [Required]
        public string DocumentType { get; set; }

        public string Documento { get; set; }

        public bool IsAdmin { get; set; }

        [Required]
        public int Age { get; set; }

        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }

        // Navigation property for related Rentals
        public ICollection<Rental> Rentals { get; set; }

        public ICollection<Game> RentedGames { get; set; }
    }
}
