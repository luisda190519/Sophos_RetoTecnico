Use gameDB;

INSERT INTO Brands (Name)
VALUES
    ('Riot Games'),
    ('Activision'),
    ('Blizzard'),
    ('Rockstar'),
    ('Nintendo'),
    ('Sony'),
    ('Konami'),
    ('EA sports');

INSERT INTO Platforms (Name)
VALUES
    ('PC'),
    ('Xbox 360'),
    ('Xbox One'),
    ('Playstation 4'),
    ('Playstation 3 '),
    ('Nintendo');


INSERT INTO AspNetUsers (PasswordHash, Name, LastName, Address, Email, Cellphone, Gender, DocumentType, Documento, Age, IsAdmin)
VALUES
    ('AQAAAAEAACcQAAAAEPuC9VEPNOrIMdc952hjqBp/4XIl7/fckpbMBJw18nWItQOTiqW2Sc9dtc5njK0xvg==', 'Juan', 'Pérez', 'Calle Principal 123', 'juan@example.com', '123-456-7890', 'Masculino', 'Pasaporte', '123467898', 18, 1),
    ('AQAAAAEAACcQAAAAEI2Q5144FBbv+b5YjVbfSoM5Isky6abgvuU4/ysMuuCWpuBCd5yU6s3W8sEDwhk19A==', 'María', 'González', 'Avenida Elm 456', 'maria@example.com', '987-654-3210', 'Femenino', 'Cedula' , '4654678646', 21, 0);

INSERT INTO Customers(ApplicationUserId)
VALUES
	(1),
	(2);

INSERT INTO Games (Description, Title, Year, Director, Producer, ImageUrl, Price)
VALUES
    ('League of Legends es un juego en equipo con más de 140 campeones con los que realizar jugadas épicas', 'League of Legends', '2009-10-27', 'Riot Games', 'Riot Games', 'https://static1-es.millenium.gg/articles/0/25/99/0/@/119862-lol-article_image_t-1.jpg', 29.99),
    ('El comandante Graves regresa a Call of Duty®: Modern Warfare 2 Temporada 5! Elige tu bando entre la fuerza operativa 141', 'Call of Duty: Modern Warfare 2', '2009-11-10', 'Infinity Ward', 'Activision', 'https://d34vmoxq6ylzee.cloudfront.net/magefan_blog/2CODMW2.jpg', 39.99),
    ('Explora y descubre un mundo lleno de aventuras en The Legend of Zelda: Breath of the Wild, una nueva saga que rompe los esquemas de la aclamada serie.', 'The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Hidemaro Fujibayashi', 'Eiji Aonuma', 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58', 49.99),
    ('Red Dead Redemption 2 es un videojuego de acción-aventura western basado en el drama. Un juego bastante conocido también por sus cantidades de detalles realistas en un mundo abierto y en perspectiva de primera y tercera persona, ​ con componentes para un jugador y multijugador.​ Fue desarrollado por Rockstar Games.', 'Red Dead Redemption 2', '2018-10-26', 'Rod Edge', 'Rob Nelson', 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png', 59.99),
    ('The Witcher 3: Wild Hunt es un videojuego de rol desarrollado y publicado por la compañía polaca CD Projekt RED. Esta compañía es la desarrolladora mientras que la distribución corre a cargo de la Warner Bros. Interactive, en el caso de Norteamérica y Bandai Namco para Europa.', 'The Witcher 3: Wild Hunt', '2015-05-19', 'Konrad Tomaszkiewicz', 'Piotr Krzywonosiuk', 'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png', 39.99),
    ('Minecraft es un juego de bloques que podrás transformar en cualquier cosa que te imagines. Juega en el modo creativo con recursos ilimitados o busca herramientas para defenderte de los peligros que acechan en el modo supervivencia. Con el juego multiplataforma sin interrupciones en Minecraft: Bedrock Edition, puedes aventurarte por tu cuenta o con tus amigos y descubrir un mundo infinito generado aleatoriamente lleno de bloques que minar, biomas que explorar y criaturas con las que entablar amistad (o luchar).', 'Minecraft', '2011-11-18', 'Markus Persson', 'Markus Persson', 'https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png', 19.99),
    ('Fortnite es un videojuego del año 2017 desarrollado por la empresa Epic Games lanzado como diferentes paquetes de software que presentan diferentes modos de juego, pero que comparten el mismo motor de juego y mecánicas. Fue anunciado en los premios Spike Video Game Awards en 2011.', 'Fortnite', '2017-07-25', 'Darren Sugg', 'Zak Phelps', 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000010192/d7d122e8b5680f10d50587141a9f8c4fab17d8557b884a60531d16e861a70cb3', 0.00), 
    ('Grand Theft Auto V es un videojuego de acción-aventura de mundo abierto en tercera persona desarrollado por el estudio escocés Rockstar North y distribuido por Rockstar Games. Fue lanzado el 17 de septiembre de 2013 para las consolas Xbox 360 y PlayStation 3', 'Grand Theft Auto V', '2013-09-17', 'Leslie Benzies', 'Rockstar North', 'https://m.media-amazon.com/images/I/91T0XQv8gEL.jpg', 49.99),
    ('Overwatch es una franquicia multimedia centrada en una serie de videojuegos de disparos en primera persona multijugador en línea desarrollados por Blizzard Entertainment: Overwatch se lanzó en 2016 y Overwatch 2 se lanzó en 2022.', 'Overwatch', '2016-05-24', 'Jeff Kaplan', 'Chacko Sonny', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/220px-Overwatch_cover_art.jpg', 29.99),
    ('Cyberpunk 2077 es un videojuego perteneciente al género rol de acción y disparos en primera persona desarrollado y publicado por CD Projekt, que se lanzó para Microsoft Windows, PlayStation 4 y Xbox One el 10 de diciembre de 2020, y posteriormente en PlayStation 5, Xbox Series X|S y Google Stadia', 'Cyberpunk 2077', '2020-12-10', 'Adam Badowski', 'Richard Borzymowski', 'https://sm.ign.com/ign_es/game/c/cyberpunk-/cyberpunk-2077_ygyu.jpg', 49.99),
    ('Final Fantasy VII Remake es un videojuego de rol de acción, publicado por la empresa Square Enix inicialmente para la plataforma PlayStation 4, que fue lanzado el 10 de abril de 2020.​ Es una nueva versión del videojuego Final Fantasy VII del año 1997 para la consola PlayStation.', 'Final Fantasy VII Remake', '2020-04-10', 'Tetsuya Nomura', 'Yoshinori Kitase', 'https://i.blogs.es/748356/ggx33/1366_2000.jpeg', 49.99),
    ('Halo Infinite es un videojuego de disparos en primera persona de la franquicia de videojuegos de ciencia ficción creada por Bungie Studios y actualmente desarrollada por 343 Industries. Es exclusivo para las plataformas Xbox One, Microsoft Windows y Xbox Series X|S.', 'Halo Infinite', '2021-12-08', 'Chris Le', 'Kieran Daly', 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/11/halo-infinite-2535867.jpg?tf=3840x', 59.99);

INSERT INTO GameBrand (GamesGameID, BrandsBrandID)
VALUES
    (1, 1), -- League of Legends - Riot Games
    (2, 2), -- Call of Duty: Modern Warfare 2 - Activision
    (3, 5), -- The Legend of Zelda: Breath of the Wild - Nintendo
    (4, 3), -- Red Dead Redemption 2 - Rockstar
    (5, 4), -- The Witcher 3: Wild Hunt - Konami
    (6, 2), -- Minecraft - Activision
    (7, 7), -- Fortnite - EA Sports
    (8, 8), -- Grand Theft Auto V - Rockstar
    (9, 6), -- Overwatch - Sony
    (10, 3), -- Cyberpunk 2077 - Blizzard
    (11, 5), -- Final Fantasy VII Remake - Nintendo
    (12, 2); -- Halo Infinite - Activision

INSERT INTO GamePlatform (GamesGameID, PlatformsPlatformID)
VALUES
    (1, 1), -- League of Legends - PC
    (2, 3), -- Call of Duty: Modern Warfare 2 - Xbox One
    (3, 6), -- The Legend of Zelda: Breath of the Wild - Nintendo Switch
    (4, 3), -- Red Dead Redemption 2 - Xbox One
    (5, 1), -- The Witcher 3: Wild Hunt - PC
    (6, 2), -- Minecraft - Xbox 360
    (7, 3), -- Fortnite - Xbox One
    (8, 1), -- Grand Theft Auto V - PC
    (9, 4), -- Overwatch - Playstation 4
    (10, 3), -- Cyberpunk 2077 - Xbox One
    (11, 4), -- Final Fantasy VII Remake - Playstation 3
    (12, 2); -- Halo Infinite - Xbox 360


INSERT INTO MainCharacters (Name, ImageURL, GameID)
VALUES
    ('Viego', 'https://static.wikia.nocookie.net/leagueoflegends/images/2/26/Cuadro_-_Viego_Cl%C3%A1sico.jpg/revision/latest/scale-to-width-down/380?cb=20230711010351&path-prefix=es', 1),
    ('Soap', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89f42578-dec8-41ae-b422-939b4391921a/dfou4mv-48a1fee2-35e7-42c5-8158-6d98ca47d377.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyMjY0MzczYTVmMGD4MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5ZjQyNTc4LWRlYzgtNDFhZS1iNDIyLTkzOWI0MzkxOTIxYVwvZGZvdTRtdi00OGExZmVlMi0zNWU3LTQyYzUtODE1OC02ZDk4Y2E4MTI3Yi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.SaDq1cDVXP_iO5FeAJUSnuY2G4hYs_RWh6QGj0mw3E', 2),
    ('Link', 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/3/38/Link2.png', 3),
    ('Arthur Morgan', 'https://static.wikia.nocookie.net/reddeadredemption/images/5/52/RDR2_Arthur_Morgan_Default.jpg/revision/latest?cb=20200602191534', 4),
    ('Geralt of Rivia', 'https://media.vandal.net/i/620x620/7-2023/202373111153222_1.jpg', 5),
    ('Steve', 'https://static.wikia.nocookie.net/heroe/images/3/3a/Steve_SSBU.png/revision/latest?cb=20210501222417&path-prefix=es', 6),
    ('Jonesy', 'https://skinsdefortnite.com/wp-content/uploads/2021/01/fortnite-outfit-jonesy-the-first.jpg', 7),
    ('Michael De Santa', 'https://static.wikia.nocookie.net/esgta/images/6/6c/Michael_De_Santa.png/revision/latest?cb=20200718184410', 8),
    ('Tracer', 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/overwatch/b/b1/Tracerskin1.jpg?width=325', 9),
    ('V', 'https://assetsio.reedpopcdn.com/cyberpunk-2077-modders-make-unused-quests-and-e3-v-playable-1618840339115.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp', 10),
    ('Cloud Strife', 'https://static.wikia.nocookie.net/esfinalfantasy/images/c/ca/Cloud_Strife_-_Arte_Nomura.jpg/revision/latest?cb=20090526165815', 11),
    ('Master Chief', 'https://static.wikia.nocookie.net/doblaje/images/8/82/Jefe_maestro_117_recortado.jpg/revision/latest/scale-to-width-down/1200?cb=20220403185716&path-prefix=es', 12);


INSERT INTO Rentals (CustomerID, GameID, RentalDate, DueDate, PayMethod, Finished, TotalBalance)
VALUES
    (1, 1, DATEADD(day, -7, GETDATE()), DATEADD(day, 7, GETDATE()), 'Credit Card', 0, 15),
    (2, 2, DATEADD(day, -10, GETDATE()), DATEADD(day, 10, GETDATE()), 'PayPal', 1, 26),
	(1, 3, DATEADD(day, -10, GETDATE()), DATEADD(day, 10, GETDATE()), 'PayPal', 1, 26),
	(2, 4, DATEADD(day, -10, GETDATE()), DATEADD(day, 10, GETDATE()), 'PayPal', 1, 26),
	(1, 5, DATEADD(day, -10, GETDATE()), DATEADD(day, 10, GETDATE()), 'PayPal', 1, 26),
	(2, 6, DATEADD(day, -10, GETDATE()), DATEADD(day, 10, GETDATE()), 'PayPal', 1, 26);
