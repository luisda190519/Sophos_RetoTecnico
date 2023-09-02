namespace PlayPalace_backend.Models
{
    public class GameAgeRange
    {
        public int GameAgeRangeID { get; set; }
        public int GameID { get; set; }
        public int StartAge { get; set; }
        public int EndAge { get; set; }

        public Game Game { get; set; }
    }
}
