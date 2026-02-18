USE [Ghost2025]
GO

 --DROP TABLE D_I_ItemUnits

 go


CREATE TABLE [dbo].[D_I_ItemUnits](
	[ItemUnitID] [int] IDENTITY(1,1) NOT NULL,
	[ItemID] [int] NULL,
	[UnitID] [int] NULL,
	[Quantity] [decimal](18, 2) NULL,
	[UnitPrice] [decimal](18, 2) NULL,
	[Remarks] [nvarchar](4000) NULL,
 CONSTRAINT [PK_D_I_ItemUnits] PRIMARY KEY CLUSTERED 
(
	[ItemUnitID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



ALTER TABLE D_I_Items
DROP COLUMN UnitID;

GO


ALTER TABLE D_I_Units
DROP COLUMN Quantity;  
GO



ALTER TABLE D_I_Units 
DROP COLUMN UnitPrice; 
GO



CREATE VIEW [dbo].[IQ_GetItemInfo]
AS
SELECT       Item.ItemID, Item.ItemName, ItemUnt.ItemUnitID, ItemUnt.Quantity, ItemUnt.UnitPrice, Unt.UnitID, Unt.UnitCode, Unt.DescA AS UnitDescA, Family.ItemFamilyID, Family.FamilyCode, Family.DescA AS FamilyDescA, 
                         dbo.D_I_Category.CatID, dbo.D_I_Category.CatCode, dbo.D_I_Category.DescA AS CatDescA
FROM            dbo.D_I_Items AS Item INNER JOIN
                         dbo.D_I_ItemUnits AS ItemUnt ON Item.ItemID = ItemUnt.ItemID INNER JOIN
                         dbo.D_I_Units AS Unt ON ItemUnt.UnitID = Unt.UnitID INNER JOIN
                         dbo.D_I_ItemFamily AS Family ON Item.ItemFamilyID = Family.ItemFamilyID INNER JOIN
                         dbo.D_I_Category ON Family.CatID = dbo.D_I_Category.CatID
GO