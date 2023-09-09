IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [AspNetRoles] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [AspNetUsers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    [Cellphone] nvarchar(max) NOT NULL,
    [Gender] nvarchar(max) NOT NULL,
    [DocumentType] nvarchar(max) NOT NULL,
    [Documento] nvarchar(max) NOT NULL,
    [Age] int NOT NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [PasswordHash] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [LockoutEnd] datetimeoffset NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Brands] (
    [BrandID] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Brands] PRIMARY KEY ([BrandID])
);
GO

CREATE TABLE [Platforms] (
    [PlatformID] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Platforms] PRIMARY KEY ([PlatformID])
);
GO

CREATE TABLE [AspNetRoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] nvarchar(128) NOT NULL,
    [ProviderKey] nvarchar(128) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserRoles] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [AspNetUserTokens] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(128) NOT NULL,
    [Name] nvarchar(128) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Customers] (
    [CustomerID] int NOT NULL IDENTITY,
    [ApplicationUserId] int NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([CustomerID]),
    CONSTRAINT [FK_Customers_AspNetUsers_ApplicationUserId] FOREIGN KEY ([ApplicationUserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Games] (
    [GameID] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Year] datetime2 NOT NULL,
    [Director] nvarchar(max) NOT NULL,
    [Producer] nvarchar(max) NOT NULL,
    [ImageUrl] nvarchar(max) NOT NULL,
    [Price] float NOT NULL,
    [ApplicationUserId] int NULL,
    CONSTRAINT [PK_Games] PRIMARY KEY ([GameID]),
    CONSTRAINT [FK_Games_AspNetUsers_ApplicationUserId] FOREIGN KEY ([ApplicationUserId]) REFERENCES [AspNetUsers] ([Id])
);
GO

CREATE TABLE [GameBrand] (
    [BrandsBrandID] int NOT NULL,
    [GamesGameID] int NOT NULL,
    CONSTRAINT [PK_GameBrand] PRIMARY KEY ([BrandsBrandID], [GamesGameID]),
    CONSTRAINT [FK_GameBrand_Brands_BrandsBrandID] FOREIGN KEY ([BrandsBrandID]) REFERENCES [Brands] ([BrandID]) ON DELETE CASCADE,
    CONSTRAINT [FK_GameBrand_Games_GamesGameID] FOREIGN KEY ([GamesGameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE
);
GO

CREATE TABLE [GamePlatform] (
    [GamesGameID] int NOT NULL,
    [PlatformsPlatformID] int NOT NULL,
    CONSTRAINT [PK_GamePlatform] PRIMARY KEY ([GamesGameID], [PlatformsPlatformID]),
    CONSTRAINT [FK_GamePlatform_Games_GamesGameID] FOREIGN KEY ([GamesGameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE,
    CONSTRAINT [FK_GamePlatform_Platforms_PlatformsPlatformID] FOREIGN KEY ([PlatformsPlatformID]) REFERENCES [Platforms] ([PlatformID]) ON DELETE CASCADE
);
GO

CREATE TABLE [MainCharacters] (
    [CharacterID] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [ImageURL] nvarchar(max) NOT NULL,
    [GameID] int NOT NULL,
    CONSTRAINT [PK_MainCharacters] PRIMARY KEY ([CharacterID]),
    CONSTRAINT [FK_MainCharacters_Games_GameID] FOREIGN KEY ([GameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE
);
GO

CREATE TABLE [Rentals] (
    [RentalID] int NOT NULL IDENTITY,
    [customerID] int NOT NULL,
    [GameID] int NOT NULL,
    [RentalDate] datetime2 NOT NULL,
    [DueDate] datetime2 NOT NULL,
    [Price] float NOT NULL,
    [DailyRate] float NOT NULL,
    [PayMethod] nvarchar(max) NOT NULL,
    [Finished] bit NOT NULL,
    [ApplicationUserId] int NULL,
    CONSTRAINT [PK_Rentals] PRIMARY KEY ([RentalID]),
    CONSTRAINT [FK_Rentals_AspNetUsers_ApplicationUserId] FOREIGN KEY ([ApplicationUserId]) REFERENCES [AspNetUsers] ([Id]),
    CONSTRAINT [FK_Rentals_Customers_customerID] FOREIGN KEY ([customerID]) REFERENCES [Customers] ([CustomerID]) ON DELETE CASCADE,
    CONSTRAINT [FK_Rentals_Games_GameID] FOREIGN KEY ([GameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
GO

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
GO

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
GO

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
GO

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
GO

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO

CREATE INDEX [IX_Customers_ApplicationUserId] ON [Customers] ([ApplicationUserId]);
GO

CREATE INDEX [IX_GameBrand_GamesGameID] ON [GameBrand] ([GamesGameID]);
GO

CREATE INDEX [IX_GamePlatform_PlatformsPlatformID] ON [GamePlatform] ([PlatformsPlatformID]);
GO

CREATE INDEX [IX_Games_ApplicationUserId] ON [Games] ([ApplicationUserId]);
GO

CREATE INDEX [IX_MainCharacters_GameID] ON [MainCharacters] ([GameID]);
GO

CREATE INDEX [IX_Rentals_ApplicationUserId] ON [Rentals] ([ApplicationUserId]);
GO

CREATE INDEX [IX_Rentals_customerID] ON [Rentals] ([customerID]);
GO

CREATE INDEX [IX_Rentals_GameID] ON [Rentals] ([GameID]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230909033906_init', N'7.0.10');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230909042524_init2', N'7.0.10');
GO

COMMIT;
GO

