using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Context
{
    public class ProjectContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public ProjectContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                // Configure properties that should be required and not null
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.LastName).IsRequired();
                entity.Property(e => e.Address).IsRequired();
                entity.Property(e => e.Cellphone).IsRequired();
                entity.Property(e => e.DocumentType).IsRequired();
                entity.Property(e => e.Documento).IsRequired();
                entity.Property(e => e.Age).IsRequired();
                entity.Ignore(e => e.AccessFailedCount);
                entity.Ignore(e => e.PhoneNumberConfirmed);
                entity.Ignore(e => e.EmailConfirmed);
                entity.Ignore(e => e.TwoFactorEnabled);
                entity.Ignore(e => e.LockoutEnabled);
            });

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(u => u.Customer)
                .WithOne(c => c.ApplicationUser)
                .HasForeignKey<Customer>(c => c.ApplicationUserId);

            modelBuilder.Entity<Game>()
                .HasMany(g => g.Platforms)
                .WithMany(p => p.Games)
                .UsingEntity(j => j.ToTable("GamePlatform"));

            modelBuilder.Entity<Game>()
                .HasMany(g => g.Brands)
                .WithMany(b => b.Games)
                .UsingEntity(j => j.ToTable("GameBrand"));
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<MainCharacter> MainCharacters { get; set; }
        public DbSet<Platform> Platforms { get; set; }
    }
}
