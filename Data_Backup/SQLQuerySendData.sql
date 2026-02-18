
--delete D_I_Items where CompCode = 2 

--delete D_A_Suppliers where CompCode = 2 


--delete A_Rec_D_Customer where CompCode = 2 


--SELECT   Ser, CompCode, IsService, ItemCode, ItemName,Remarks, CostPrice, UnitPrice, Quantity, OneHandQuantity, QuantityMinimum, QtyOpenBalances, ISActive
--FROM     D_I_Items where CompCode = 2 


--SELECT  SuppliersCode, CompCode, SupplierName, IsCash, Mobile, Remarks, ISActive
--FROM     D_A_Suppliers


--SELECT   CustomerCODE, NAMEA, NAMEE, MOBILE, CompCode, Isactive, CarBrand, CarNo, DestructionKm, DrivingNum
--FROM     A_Rec_D_Customer


SELECT    ROW_NUMBER() OVER (ORDER BY Item.ItemID) AS Ser , 2 CompCode, 0 IsService , Item.ItemCode,  Item.DescA as ItemName,  Fam.DescA Remarks , ISNULL(Stor.LocalCost,0) CostPrice, ISNULL(IYear.UnitPrice,0) as UnitPrice,
Stor.OnhandQty Quantity,Stor.OnhandQty OneHandQuantity,0 QuantityMinimum,isnull(PurDet.RecQty , 0 ) QtyOpenBalances,1 ISActive
FROM     I_Item Item inner join I_ItemStore Stor on Item.ItemID = Stor.ItemID
inner join [dbo].[I_ItemYear] IYear on IYear.ItemID = Item.ItemID
inner join  [dbo].[I_ItemFamily] Fam  
on Item.ItemFamilyID  = Fam.ItemFamilyID
left join  
(
select  Det.ItemID  , Det.RecQty from [dbo].[I_Pur_TR_Receive] Pur inner join 
[dbo].[I_Pur_TR_ReceiveItems]   Det
on Det.ReceiveID = Pur.ReceiveID
where Pur.ReceiveID = 1
) PurDet
on Item.ItemID  = PurDet.ItemID
 

 go

 update Mast set Mast.ItemFamilyID = UpFamilyID.ItemFamilyID
--select * 
from [dbo].[D_I_Items] Mast inner join 
(
SELECT   Itm.ItemID ,  famil.ItemFamilyID 
FROM     D_I_Items Itm inner Join [dbo].[D_I_ItemFamily] famil
on Itm.Remarks = famil.DescA  
where Itm.CompCode = 2 
) UpFamilyID
on Mast.ItemID = UpFamilyID.ItemID






go

SELECT    ROW_NUMBER() OVER (ORDER BY VendorId) AS SuppliersCode  ,  2 CompCode , NAMEA SupplierName , REMARKS as Remarks, MOBILE as Mobile , Case when IsCreditVendor = 1 then 0 else 1 end as IsCash , 1 ISActive
FROM     Vendor



go


SELECT  ROW_NUMBER() OVER (ORDER BY CustomerId) AS CustomerCODE   , NAMEA as NAMEA , NAMEA as NAMEE , MOBILE, 2 CompCode, 1  Isactive,Case when Address_District = '' then '0' else Address_District end   as CarBrand,  Case when Address_City = '' then '0' else Address_City end  as CarNo, 0 DestructionKm, 0 DrivingNum 
FROM     Customer



