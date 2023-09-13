using System.ComponentModel.DataAnnotations;

namespace PlayPalace_backend.DTO
{
    public class SignUpDto
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

        [Required]
        public int Age { get; set; }
        public bool IsAdmin { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}
