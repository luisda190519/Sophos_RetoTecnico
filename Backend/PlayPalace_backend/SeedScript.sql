CREATE DATABASE testtttt;

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

CREATE TABLE [Brand] (
    [BrandID] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Brand] PRIMARY KEY ([BrandID])
);
GO

CREATE TABLE [Transaction] (
    [TransactionID] int NOT NULL IDENTITY,
    [RentalID] int NOT NULL,
    [TransactionDate] datetime2 NOT NULL,
    CONSTRAINT [PK_Transaction] PRIMARY KEY ([TransactionID])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230902133610_2', N'7.0.10');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Transaction] DROP CONSTRAINT [PK_Transaction];
GO

ALTER TABLE [Brand] DROP CONSTRAINT [PK_Brand];
GO

EXEC sp_rename N'[Transaction]', N'Transactions';
GO

EXEC sp_rename N'[Brand]', N'Brands';
GO

ALTER TABLE [Transactions] ADD CONSTRAINT [PK_Transactions] PRIMARY KEY ([TransactionID]);
GO

ALTER TABLE [Brands] ADD CONSTRAINT [PK_Brands] PRIMARY KEY ([BrandID]);
GO

CREATE TABLE [Customers] (
    [CustomerID] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [Address] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Cellphone] nvarchar(max) NOT NULL,
    [Gender] nvarchar(max) NOT NULL,
    [DocumentType] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([CustomerID])
);
GO

CREATE TABLE [Games] (
    [GameID] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Year] datetime2 NOT NULL,
    [Director] nvarchar(max) NOT NULL,
    [Producer] nvarchar(max) NOT NULL,
    [Platform] nvarchar(max) NOT NULL,
    [ImageUrl] nvarchar(max) NOT NULL,
    [BrandID] int NOT NULL,
    CONSTRAINT [PK_Games] PRIMARY KEY ([GameID]),
    CONSTRAINT [FK_Games_Brands_BrandID] FOREIGN KEY ([BrandID]) REFERENCES [Brands] ([BrandID]) ON DELETE CASCADE
);
GO

CREATE TABLE [GameAgeRanges] (
    [GameAgeRangeID] int NOT NULL IDENTITY,
    [GameID] int NOT NULL,
    [Start] int NOT NULL,
    [End] int NOT NULL,
    CONSTRAINT [PK_GameAgeRanges] PRIMARY KEY ([GameAgeRangeID]),
    CONSTRAINT [FK_GameAgeRanges_Games_GameID] FOREIGN KEY ([GameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE
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
    [CustomerID] int NOT NULL,
    [GameID] int NOT NULL,
    [RentalDate] datetime2 NOT NULL,
    [DueDate] datetime2 NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [PayMethod] nvarchar(max) NOT NULL,
    [Finished] bit NOT NULL,
    CONSTRAINT [PK_Rentals] PRIMARY KEY ([RentalID]),
    CONSTRAINT [FK_Rentals_Customers_CustomerID] FOREIGN KEY ([CustomerID]) REFERENCES [Customers] ([CustomerID]) ON DELETE CASCADE,
    CONSTRAINT [FK_Rentals_Games_GameID] FOREIGN KEY ([GameID]) REFERENCES [Games] ([GameID]) ON DELETE CASCADE
);
GO

CREATE UNIQUE INDEX [IX_Transactions_RentalID] ON [Transactions] ([RentalID]);
GO

CREATE INDEX [IX_GameAgeRanges_GameID] ON [GameAgeRanges] ([GameID]);
GO

CREATE INDEX [IX_Games_BrandID] ON [Games] ([BrandID]);
GO

CREATE INDEX [IX_MainCharacters_GameID] ON [MainCharacters] ([GameID]);
GO

CREATE INDEX [IX_Rentals_CustomerID] ON [Rentals] ([CustomerID]);
GO

CREATE INDEX [IX_Rentals_GameID] ON [Rentals] ([GameID]);
GO

ALTER TABLE [Transactions] ADD CONSTRAINT [FK_Transactions_Rentals_RentalID] FOREIGN KEY ([RentalID]) REFERENCES [Rentals] ([RentalID]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230902175604_DBCreated2', N'7.0.10');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Rentals]') AND [c].[name] = N'Price');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Rentals] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Rentals] ALTER COLUMN [Price] float NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230902180017_DBCreated3', N'7.0.10');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230902184122_DBCreated4', N'7.0.10');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[GameAgeRanges].[Start]', N'StartAge', N'COLUMN';
GO

EXEC sp_rename N'[GameAgeRanges].[End]', N'EndAge', N'COLUMN';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230902190816_DBCreated5', N'7.0.10');
GO

COMMIT;
GO

