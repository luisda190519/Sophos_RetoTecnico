using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;
using PlayPalace_backend.Context;

public static class SeedScript
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new ProjectContext(
            serviceProvider.GetRequiredService<DbContextOptions<ProjectContext>>()))
        {
            // Check if the database already contains data
            if (context.Customers.Any() || context.Brands.Any())
            {
                return; // Database has already been seeded
            }

            // Seed Brands
            var brands = new List<Brand>
            {
                new Brand { Name = "Riot Games" },
                new Brand { Name = "Activision" },
                new Brand { Name = "Blizzard" },
                new Brand { Name = "Rockstar" },
                new Brand { Name = "Nintendo" },
                new Brand { Name = "Sony" },
                new Brand { Name = "Konami" },
                new Brand { Name = "EA sports" }
                // Add more brands as needed
            };
            context.Brands.AddRange(brands);
            context.SaveChanges();

            // Seed Customers
            var customers = new List<Customer>
            {
                new Customer
                {
                    Name = "Juan",
                    LastName = "Pérez",
                    Address = "Calle Principal 123",
                    Email = "juan@example.com",
                    Cellphone = "123-456-7890",
                    Gender = "Masculino",
                    DocumentType = "Pasaporte"
                },
                new Customer
                {
                    Name = "María",
                    LastName = "González",
                    Address = "Avenida Elm 456",
                    Email = "maria@example.com",
                    Cellphone = "987-654-3210",
                    Gender = "Femenino",
                    DocumentType = "Cedula"
                }
                // Add more customers as needed
            };
            context.Customers.AddRange(customers);
            context.SaveChanges();

            // Seed Games
            var games = new List<Game>
            {
                new Game
                {
                    Title = "League of Legends",
                    Year = new DateTime(2009, 10, 27),
                    Director = "Riot Games",
                    Producer = "Riot Games",
                    Platform = "PC",
                    ImageUrl = "https://static1-es.millenium.gg/articles/0/25/99/0/@/119862-lol-article_image_t-1.jpg",
                    BrandID = 1 
                },
                new Game
                {
                    Title = "Call of Duty: Modern Warfare 2",
                    Year = new DateTime(2009, 11, 10),
                    Director = "Infinity Ward",
                    Producer = "Activision",
                    Platform = "Xbox",
                    ImageUrl = "https://static.wikia.nocookie.net/callofduty/images/2/27/ModernWarfareII_Keyart_MWII.jpg/revision/latest?cb=20220524163844",
                    BrandID = 2 
                },
                new Game
                {
                    Title = "The Legend of Zelda: Breath of the Wild",
                    Year = new DateTime(2017, 3, 3),
                    Director = "Hidemaro Fujibayashi",
                    Producer = "Eiji Aonuma",
                    Platform = "Nintendo Switch",
                    ImageUrl = "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
                    BrandID = 5 
                },
                new Game
                {
                    Title = "Red Dead Redemption 2",
                    Year = new DateTime(2018, 10, 26),
                    Director = "Rod Edge",
                    Producer = "Rob Nelson",
                    Platform = "Xbox",
                    ImageUrl = "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
                    BrandID = 3 
                },
                new Game
                {
                    Title = "The Witcher 3: Wild Hunt",
                    Year = new DateTime(2015, 5, 19),
                    Director = "Konrad Tomaszkiewicz",
                    Producer = "Piotr Krzywonosiuk",
                    Platform = "PC",
                    ImageUrl = "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
                    BrandID = 4
                },
                new Game
                {
                    Title = "Minecraft",
                    Year = new DateTime(2011, 11, 18),
                    Director = "Markus Persson",
                    Producer = "Markus Persson",
                    Platform = "Multiplatform",
                    ImageUrl = "https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png",
                    BrandID = 2
                },
                new Game
                {
                    Title = "Fortnite",
                    Year = new DateTime(2017, 7, 25),
                    Director = "Darren Sugg",
                    Producer = "Zak Phelps",
                    Platform = "Multiplatform",
                    ImageUrl = "https://static.wikia.nocookie.net/doblaje/images/5/54/Fortnite_poster.jpg/revision/latest?cb=20230621055145&path-prefix=es",
                    BrandID = 7
                },
                new Game
                {
                    Title = "Grand Theft Auto V",
                    Year = new DateTime(2013, 9, 17),
                    Director = "Leslie Benzies",
                    Producer = "Rockstar North",
                    Platform = "Multiplatform",
                    ImageUrl = "https://m.media-amazon.com/images/I/91T0XQv8gEL.jpg",
                    BrandID = 8
                },
                new Game
                {
                    Title = "Overwatch",
                    Year = new DateTime(2016, 5, 24),
                    Director = "Jeff Kaplan",
                    Producer = "Chacko Sonny",
                    Platform = "Multiplatform",
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg",
                    BrandID = 6
                },
                new Game
                {
                    Title = "Cyberpunk 2077",
                    Year = new DateTime(2020, 12, 10),
                    Director = "Adam Badowski",
                    Producer = "Richard Borzymowski",
                    Platform = "Multiplatform",
                    ImageUrl = "https://sm.ign.com/ign_es/game/c/cyberpunk-/cyberpunk-2077_ygyu.jpg",
                    BrandID = 3
                },
                new Game
                {
                    Title = "Final Fantasy VII Remake",
                    Year = new DateTime(2020, 4, 10),
                    Director = "Tetsuya Nomura",
                    Producer = "Yoshinori Kitase",
                    Platform = "PlayStation",
                    ImageUrl = "https://static.wikia.nocookie.net/doblaje/images/9/92/Final_Fantasy_VII_Remake_Poster.jpg/revision/latest?cb=20200410152215&path-prefix=es",
                    BrandID = 5
                },
                new Game
                {
                    Title = "Halo Infinite",
                    Year = new DateTime(2021, 12, 8),
                    Director = "Chris Lee",
                    Producer = "Kieran Daly",
                    Platform = "Xbox",
                    ImageUrl = "data:image/jpeg;base64,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",
                    BrandID = 1
}
                // Add more games as needed
            };
            context.Games.AddRange(games);
            context.SaveChanges();

            // Seed MainCharacters
            var mainCharacters = new List<MainCharacter>
            {
                new MainCharacter
                {
                    Name = "Viego",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/leagueoflegends/images/2/26/Cuadro_-_Viego_Cl%C3%A1sico.jpg/revision/latest/scale-to-width-down/380?cb=20230711010351&path-prefix=es",
                    GameID = 1 
                },
                new MainCharacter
                {
                    Name = "Soap",
                    LastName = "XML",
                    ImageURL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89f42578-dec8-41ae-b422-939b4391921a/dfou4mv-48a1fee2-35e7-42c5-8158-6d98ca47d377.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5ZjQyNTc4LWRlYzgtNDFhZS1iNDIyLTkzOWI0MzkxOTIxYVwvZGZvdTRtdi00OGExZmVlMi0zNWU3LTQyYzUtODE1OC02ZDk4Y2E0N2QzNzcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-PP9VYZNmkOMzu__6tLOIDhRs7lpJOilVok59Dmdw3E",
                    GameID = 2
                },
                new MainCharacter
                {
                    Name = "Link",
                    LastName = "",
                    ImageURL = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/3/38/Link2.png",
                    GameID = 3 
                },
                new MainCharacter
                {
                    Name = "Arthur Morgan",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/reddeadredemption/images/5/52/RDR2_Arthur_Morgan_Default.jpg/revision/latest?cb=20200602191534",
                    GameID = 4 
                },
                new MainCharacter
                {
                    Name = "Geralt of Rivia",
                    LastName = "",
                    ImageURL = "https://media.vandal.net/i/620x620/7-2023/202373111153222_1.jpg",
                    GameID = 5 
                },
                new MainCharacter
                {
                    Name = "Steve",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/heroe/images/3/3a/Steve_SSBU.png/revision/latest?cb=20210501222417&path-prefix=es",
                    GameID = 6
                },
                new MainCharacter
                {
                    Name = "Jonesy",
                    LastName = "",
                    ImageURL = "https://skinsdefortnite.com/wp-content/uploads/2021/01/fortnite-outfit-jonesy-the-first.jpg",
                    GameID = 7
                },
                new MainCharacter
                {
                    Name = "Michael De Santa",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/esgta/images/6/6c/Michael_De_Santa.png/revision/latest?cb=20200718184410",
                    GameID = 8
                },
                new MainCharacter
                {
                    Name = "Tracer",
                    LastName = "",
                    ImageURL = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/overwatch/b/b1/Tracerskin1.jpg?width=325",
                    GameID = 9
                },
                new MainCharacter
                {
                    Name = "V",
                    LastName = "",
                    ImageURL = "https://assetsio.reedpopcdn.com/cyberpunk-2077-modders-make-unused-quests-and-e3-v-playable-1618840339115.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
                    GameID = 10
                },
                new MainCharacter
                {
                    Name = "Cloud Strife",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/esfinalfantasy/images/c/ca/Cloud_Strife_-_Arte_Nomura.jpg/revision/latest?cb=20090526165815",
                    GameID = 11
                },
                new MainCharacter
                {
                    Name = "Master Chief",
                    LastName = "",
                    ImageURL = "https://static.wikia.nocookie.net/doblaje/images/8/82/Jefe_maestro_117_recortado.jpg/revision/latest/scale-to-width-down/1200?cb=20220403185716&path-prefix=es",
                    GameID = 12
                }
                // Add more main characters as needed
            };
            context.MainCharacters.AddRange(mainCharacters);
            context.SaveChanges();

            // Seed GameAgeRanges
            var gameAgeRanges = new List<GameAgeRange>
            {
                new GameAgeRange
                {
                    StartAge = 10,
                    EndAge = 19,
                    GameID = 1 // Associate with Game1
                },
                new GameAgeRange
                {
                    StartAge = 20,
                    EndAge = 29,
                    GameID = 2 // Associate with Game2
                }
                // Add more age ranges for games as needed
            };
            context.GameAgeRanges.AddRange(gameAgeRanges);
            context.SaveChanges();

            // Seed Rentals
            var rentals = new List<Rental>
            {
                new Rental
                {
                    CustomerID = 1, 
                    GameID = 1,    
                    RentalDate = DateTime.Now.AddDays(-7),
                    DueDate = DateTime.Now.AddDays(7),
                    Price = 29.99,
                    PayMethod = "Credit Card",
                    Finished = true
                },
                new Rental
                {
                    CustomerID = 2, 
                    GameID = 2,   
                    RentalDate = DateTime.Now.AddDays(-10),
                    DueDate = DateTime.Now.AddDays(10),
                    Price = 39.99,
                    PayMethod = "PayPal",
                    Finished = true
                }
                // Add more rentals as needed
            };
            context.Rentals.AddRange(rentals);
            context.SaveChanges();

           
        }
    }
}
