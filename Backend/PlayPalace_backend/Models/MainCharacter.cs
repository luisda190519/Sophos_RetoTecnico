using System.ComponentModel.DataAnnotations;

namespace PlayPalace_backend.Models
{
    public class MainCharacter
    {
        [Key]
        public int CharacterID { get; set; }
        public string Name { get; set; }
        public String LastName { get; set; }
        public string ImageURL { get; set; }
        public int GameID { get; set; }

        public Game Game { get; set; }
    }
}
