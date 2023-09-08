using System.ComponentModel.DataAnnotations;

namespace PlayPalace_backend.DTO
{
    public class SignInDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
