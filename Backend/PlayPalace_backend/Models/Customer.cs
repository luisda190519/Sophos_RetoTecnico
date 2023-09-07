using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PlayPalace_backend.Models
{
    public class Customer : IdentityUser<int>
    {
        public int CustomerID { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Cellphone { get; set; }

        public String Gender { get; set; }

        [Required]
        public string DocumentType { get; set; }
        
        [Required]
        public int YearOfBirth { get; set; }

        public ICollection<Rental> Rentals { get; set; }
    }
}
