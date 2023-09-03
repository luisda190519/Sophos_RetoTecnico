﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PlayPalace_backend.Context;

#nullable disable

namespace PlayPalace_backend.Migrations
{
    [DbContext(typeof(ProjectContext))]
    [Migration("20230902214950_DBCreated7")]
    partial class DBCreated7
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PlayPalace_backend.Models.Brand", b =>
                {
                    b.Property<int>("BrandID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BrandID"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BrandID");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Customer", b =>
                {
                    b.Property<int>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerID"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cellphone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CustomerID");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Game", b =>
                {
                    b.Property<int>("GameID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GameID"));

                    b.Property<int>("BrandID")
                        .HasColumnType("int");

                    b.Property<string>("Director")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Platform")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<string>("Producer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Year")
                        .HasColumnType("datetime2");

                    b.HasKey("GameID");

                    b.HasIndex("BrandID");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.GameAgeRange", b =>
                {
                    b.Property<int>("GameAgeRangeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GameAgeRangeID"));

                    b.Property<int>("EndAge")
                        .HasColumnType("int");

                    b.Property<int>("GameID")
                        .HasColumnType("int");

                    b.Property<int>("StartAge")
                        .HasColumnType("int");

                    b.HasKey("GameAgeRangeID");

                    b.HasIndex("GameID");

                    b.ToTable("GameAgeRanges");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.MainCharacter", b =>
                {
                    b.Property<int>("CharacterID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CharacterID"));

                    b.Property<int>("GameID")
                        .HasColumnType("int");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CharacterID");

                    b.HasIndex("GameID");

                    b.ToTable("MainCharacters");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Rental", b =>
                {
                    b.Property<int>("RentalID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RentalID"));

                    b.Property<int>("CustomerID")
                        .HasColumnType("int");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Finished")
                        .HasColumnType("bit");

                    b.Property<int>("GameID")
                        .HasColumnType("int");

                    b.Property<string>("PayMethod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("RentalDate")
                        .HasColumnType("datetime2");

                    b.HasKey("RentalID");

                    b.HasIndex("CustomerID");

                    b.HasIndex("GameID");

                    b.ToTable("Rentals");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Game", b =>
                {
                    b.HasOne("PlayPalace_backend.Models.Brand", "Brand")
                        .WithMany("Games")
                        .HasForeignKey("BrandID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.GameAgeRange", b =>
                {
                    b.HasOne("PlayPalace_backend.Models.Game", "Game")
                        .WithMany("GameAgeRanges")
                        .HasForeignKey("GameID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.MainCharacter", b =>
                {
                    b.HasOne("PlayPalace_backend.Models.Game", "Game")
                        .WithMany("MainCharacters")
                        .HasForeignKey("GameID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Rental", b =>
                {
                    b.HasOne("PlayPalace_backend.Models.Customer", "Customer")
                        .WithMany("Rentals")
                        .HasForeignKey("CustomerID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PlayPalace_backend.Models.Game", "Game")
                        .WithMany("Rentals")
                        .HasForeignKey("GameID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Brand", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Customer", b =>
                {
                    b.Navigation("Rentals");
                });

            modelBuilder.Entity("PlayPalace_backend.Models.Game", b =>
                {
                    b.Navigation("GameAgeRanges");

                    b.Navigation("MainCharacters");

                    b.Navigation("Rentals");
                });
#pragma warning restore 612, 618
        }
    }
}