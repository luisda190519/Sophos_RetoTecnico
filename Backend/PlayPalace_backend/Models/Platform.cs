using System.ComponentModel.DataAnnotations;

namespace PlayPalace_backend.Models
{
    public class Platform
    {
        public int PlatformID { get; set; }
        public string Name { get; set; }

        public ICollection<Game> Games { get; set; }
    }
}
