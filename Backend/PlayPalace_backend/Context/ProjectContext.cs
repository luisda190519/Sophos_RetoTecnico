using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Context
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<GameAgeRange> GameAgeRanges { get; set; }
        public DbSet<MainCharacter> MainCharacters { get; set; }
    }
}
