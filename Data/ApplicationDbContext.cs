using WebAppReact.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace WebAppReact.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<Activities> Activities { get; set; }
        public virtual DbSet<Sexs> Sexs { get; set; }
        public virtual DbSet<UsersData> UsersData { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<UserStats> UserStats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Activities>(entity =>
            {
                entity.HasKey(e => e.ActivityId);

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Pal).HasColumnName("PAL");
            });

            modelBuilder.Entity<Sexs>(entity =>
            {
                entity.HasKey(e => e.SexId);

                entity.Property(e => e.SexId).HasColumnName("SexID");

                entity.Property(e => e.Abbreviation)
                    .IsRequired()
                    .HasMaxLength(1);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<UsersData>(entity =>
            {
                entity.HasKey(e => e.UserDataId);

                entity.Property(e => e.UserDataId).HasColumnName("UserID");

                entity.Property(e => e.ActivityId).HasColumnName("ActivityID");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.SexId).HasColumnName("SexID");

                entity.HasOne(d => d.Activity)
                    .WithMany(p => p.UsersData)
                    .HasForeignKey(d => d.ActivityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Activities");

                entity.HasOne(d => d.Sex)
                    .WithMany(p => p.UsersData)
                    .HasForeignKey(d => d.SexId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Sexs");
            });

            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.HasOne(d => d.UsersData)
                    .WithOne(p => p.ApplicationUser)
                    .HasForeignKey<UsersData>(d => d.ApplicationUserId)
                    .HasConstraintName("FK_ApplicationUser_UsersData");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");
            });

            modelBuilder.Entity<UserStats>(entity =>
            {
                entity.HasKey(e => e.UserStatsId);
            });
        }
    }
}
