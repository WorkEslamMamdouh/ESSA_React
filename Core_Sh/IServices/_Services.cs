using Core.UI.Repository;
using Core.UI.Repository.Models;
using Grpc.Core;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.IO.Compression;
namespace Core.UI.IServices
{
  public class _Service : _Interface  
{
ModelDbContext db;
  public _Service(ModelDbContext _db) 
{
 this.db = _db;
}
 public A_ACCOUNT InsertA_ACCOUNT(A_ACCOUNT Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public A_ACCOUNT UpdateA_ACCOUNT(A_ACCOUNT Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteA_ACCOUNT( string ACC_CODE,int COMP_CODE) 
   {
 var Deleted = db.Set<A_ACCOUNT>().Find( ACC_CODE , COMP_CODE);
    if (Deleted != null)
   {
        db.Set<A_ACCOUNT>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public A_ACCOUNT_YEAR InsertA_ACCOUNT_YEAR(A_ACCOUNT_YEAR Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public A_ACCOUNT_YEAR UpdateA_ACCOUNT_YEAR(A_ACCOUNT_YEAR Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteA_ACCOUNT_YEAR( string ACC_CODE,int COMP_CODE,int FIN_YEAR) 
   {
 var Deleted = db.Set<A_ACCOUNT_YEAR>().Find( ACC_CODE , COMP_CODE , FIN_YEAR);
    if (Deleted != null)
   {
        db.Set<A_ACCOUNT_YEAR>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public A_JOURNAL_DETAIL InsertA_JOURNAL_DETAIL(A_JOURNAL_DETAIL Tbl) 
{
Tbl.VoucherDetailID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public A_JOURNAL_DETAIL UpdateA_JOURNAL_DETAIL(A_JOURNAL_DETAIL Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteA_JOURNAL_DETAIL(int  VoucherDetailID) 
   {
 var Deleted = db.Set<A_JOURNAL_DETAIL>().Find(VoucherDetailID);
    if (Deleted != null)
   {
        db.Set<A_JOURNAL_DETAIL>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public A_JOURNAL_HEADER InsertA_JOURNAL_HEADER(A_JOURNAL_HEADER Tbl) 
{
Tbl.VoucherID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public A_JOURNAL_HEADER UpdateA_JOURNAL_HEADER(A_JOURNAL_HEADER Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteA_JOURNAL_HEADER(int  VoucherID) 
   {
 var Deleted = db.Set<A_JOURNAL_HEADER>().Find(VoucherID);
    if (Deleted != null)
   {
        db.Set<A_JOURNAL_HEADER>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public A_TR_ReceiptNote InsertA_TR_ReceiptNote(A_TR_ReceiptNote Tbl) 
{
Tbl.TransactionID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public A_TR_ReceiptNote UpdateA_TR_ReceiptNote(A_TR_ReceiptNote Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteA_TR_ReceiptNote(int  TransactionID) 
   {
 var Deleted = db.Set<A_TR_ReceiptNote>().Find(TransactionID);
    if (Deleted != null)
   {
        db.Set<A_TR_ReceiptNote>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public AQ_A_Account InsertAQ_A_Account(AQ_A_Account Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public AQ_A_Account UpdateAQ_A_Account(AQ_A_Account Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public AQ_JOURNAL_DETAIL InsertAQ_JOURNAL_DETAIL(AQ_JOURNAL_DETAIL Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public AQ_JOURNAL_DETAIL UpdateAQ_JOURNAL_DETAIL(AQ_JOURNAL_DETAIL Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public AQ_JOURNAL_HEADER InsertAQ_JOURNAL_HEADER(AQ_JOURNAL_HEADER Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public AQ_JOURNAL_HEADER UpdateAQ_JOURNAL_HEADER(AQ_JOURNAL_HEADER Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public CheckTransactionsUnPosted InsertCheckTransactionsUnPosted(CheckTransactionsUnPosted Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public CheckTransactionsUnPosted UpdateCheckTransactionsUnPosted(CheckTransactionsUnPosted Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_A_CashTypes InsertD_A_CashTypes(D_A_CashTypes Tbl) 
{
Tbl.CashTypeID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_A_CashTypes UpdateD_A_CashTypes(D_A_CashTypes Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_A_CashTypes(int  CashTypeID) 
   {
 var Deleted = db.Set<D_A_CashTypes>().Find(CashTypeID);
    if (Deleted != null)
   {
        db.Set<D_A_CashTypes>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_A_FinancialType InsertD_A_FinancialType(D_A_FinancialType Tbl) 
{
Tbl.FinancialTypeID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_A_FinancialType UpdateD_A_FinancialType(D_A_FinancialType Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_A_FinancialType(int  FinancialTypeID) 
   {
 var Deleted = db.Set<D_A_FinancialType>().Find(FinancialTypeID);
    if (Deleted != null)
   {
        db.Set<D_A_FinancialType>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_A_Suppliers InsertD_A_Suppliers(D_A_Suppliers Tbl) 
{
Tbl.SupplierID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_A_Suppliers UpdateD_A_Suppliers(D_A_Suppliers Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_A_Suppliers(int  SupplierID) 
   {
 var Deleted = db.Set<D_A_Suppliers>().Find(SupplierID);
    if (Deleted != null)
   {
        db.Set<D_A_Suppliers>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_A_VatType InsertD_A_VatType(D_A_VatType Tbl) 
{
Tbl.VatTypeID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_A_VatType UpdateD_A_VatType(D_A_VatType Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_A_VatType(int  VatTypeID) 
   {
 var Deleted = db.Set<D_A_VatType>().Find(VatTypeID);
    if (Deleted != null)
   {
        db.Set<D_A_VatType>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_Customer InsertD_Customer(D_Customer Tbl) 
{
Tbl.CustomerId = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_Customer UpdateD_Customer(D_Customer Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_Customer(int  CustomerId) 
   {
 var Deleted = db.Set<D_Customer>().Find(CustomerId);
    if (Deleted != null)
   {
        db.Set<D_Customer>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_Currency InsertD_G_Currency(D_G_Currency Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_Currency UpdateD_G_Currency(D_G_Currency Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_Currency(int  CurrencyID) 
   {
 var Deleted = db.Set<D_G_Currency>().Find(CurrencyID);
    if (Deleted != null)
   {
        db.Set<D_G_Currency>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_FamilyZone InsertD_G_FamilyZone(D_G_FamilyZone Tbl) 
{
Tbl.FamilyZoneID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_FamilyZone UpdateD_G_FamilyZone(D_G_FamilyZone Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_FamilyZone(int  FamilyZoneID) 
   {
 var Deleted = db.Set<D_G_FamilyZone>().Find(FamilyZoneID);
    if (Deleted != null)
   {
        db.Set<D_G_FamilyZone>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_Nationality InsertD_G_Nationality(D_G_Nationality Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_Nationality UpdateD_G_Nationality(D_G_Nationality Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_Nationality(int  NationalityID) 
   {
 var Deleted = db.Set<D_G_Nationality>().Find(NationalityID);
    if (Deleted != null)
   {
        db.Set<D_G_Nationality>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_Store InsertD_G_Store(D_G_Store Tbl) 
{
Tbl.StoreID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_Store UpdateD_G_Store(D_G_Store Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_Store(int  StoreID) 
   {
 var Deleted = db.Set<D_G_Store>().Find(StoreID);
    if (Deleted != null)
   {
        db.Set<D_G_Store>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_TaxAddDed InsertD_G_TaxAddDed(D_G_TaxAddDed Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_TaxAddDed UpdateD_G_TaxAddDed(D_G_TaxAddDed Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_TaxAddDed(int  TaxID) 
   {
 var Deleted = db.Set<D_G_TaxAddDed>().Find(TaxID);
    if (Deleted != null)
   {
        db.Set<D_G_TaxAddDed>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_G_Zones InsertD_G_Zones(D_G_Zones Tbl) 
{
Tbl.ZoneID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_G_Zones UpdateD_G_Zones(D_G_Zones Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_G_Zones(int  ZoneID) 
   {
 var Deleted = db.Set<D_G_Zones>().Find(ZoneID);
    if (Deleted != null)
   {
        db.Set<D_G_Zones>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_Category InsertD_I_Category(D_I_Category Tbl) 
{
Tbl.CatID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_Category UpdateD_I_Category(D_I_Category Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_Category(int  CatID) 
   {
 var Deleted = db.Set<D_I_Category>().Find(CatID);
    if (Deleted != null)
   {
        db.Set<D_I_Category>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_ItemFamily InsertD_I_ItemFamily(D_I_ItemFamily Tbl) 
{
Tbl.ItemFamilyID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_ItemFamily UpdateD_I_ItemFamily(D_I_ItemFamily Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_ItemFamily(int  ItemFamilyID) 
   {
 var Deleted = db.Set<D_I_ItemFamily>().Find(ItemFamilyID);
    if (Deleted != null)
   {
        db.Set<D_I_ItemFamily>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_Items InsertD_I_Items(D_I_Items Tbl) 
{
Tbl.ItemID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_Items UpdateD_I_Items(D_I_Items Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_Items(int  ItemID) 
   {
 var Deleted = db.Set<D_I_Items>().Find(ItemID);
    if (Deleted != null)
   {
        db.Set<D_I_Items>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_Items_Temp InsertD_I_Items_Temp(D_I_Items_Temp Tbl) 
{
Tbl.ItemID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_Items_Temp UpdateD_I_Items_Temp(D_I_Items_Temp Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_ItemTaxEG InsertD_I_ItemTaxEG(D_I_ItemTaxEG Tbl) 
{
Tbl.ItemTaxID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_ItemTaxEG UpdateD_I_ItemTaxEG(D_I_ItemTaxEG Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_ItemTaxEG(int  ItemTaxID) 
   {
 var Deleted = db.Set<D_I_ItemTaxEG>().Find(ItemTaxID);
    if (Deleted != null)
   {
        db.Set<D_I_ItemTaxEG>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_ItemUnits InsertD_I_ItemUnits(D_I_ItemUnits Tbl) 
{
Tbl.ItemUnitID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_ItemUnits UpdateD_I_ItemUnits(D_I_ItemUnits Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_ItemUnits(int  ItemUnitID) 
   {
 var Deleted = db.Set<D_I_ItemUnits>().Find(ItemUnitID);
    if (Deleted != null)
   {
        db.Set<D_I_ItemUnits>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_Tables InsertD_I_Tables(D_I_Tables Tbl) 
{
Tbl.TableID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_Tables UpdateD_I_Tables(D_I_Tables Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_Tables(int  TableID) 
   {
 var Deleted = db.Set<D_I_Tables>().Find(TableID);
    if (Deleted != null)
   {
        db.Set<D_I_Tables>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public D_I_Units InsertD_I_Units(D_I_Units Tbl) 
{
Tbl.UnitID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public D_I_Units UpdateD_I_Units(D_I_Units Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteD_I_Units(int  UnitID) 
   {
 var Deleted = db.Set<D_I_Units>().Find(UnitID);
    if (Deleted != null)
   {
        db.Set<D_I_Units>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public DQ_A_Supplier InsertDQ_A_Supplier(DQ_A_Supplier Tbl) 
{
Tbl.SupplierID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public DQ_A_Supplier UpdateDQ_A_Supplier(DQ_A_Supplier Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_D_G_CreateTempExcel InsertE_D_G_CreateTempExcel(E_D_G_CreateTempExcel Tbl) 
{
Tbl.IDTempExcel = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_D_G_CreateTempExcel UpdateE_D_G_CreateTempExcel(E_D_G_CreateTempExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_D_G_CreateTempExcel(int  IDTempExcel) 
   {
 var Deleted = db.Set<E_D_G_CreateTempExcel>().Find(IDTempExcel);
    if (Deleted != null)
   {
        db.Set<E_D_G_CreateTempExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public E_D_G_TypeTempExcel InsertE_D_G_TypeTempExcel(E_D_G_TypeTempExcel Tbl) 
{
Tbl.IDTypeTemp = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_D_G_TypeTempExcel UpdateE_D_G_TypeTempExcel(E_D_G_TypeTempExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_D_G_TypeTempExcel(int  IDTypeTemp) 
   {
 var Deleted = db.Set<E_D_G_TypeTempExcel>().Find(IDTypeTemp);
    if (Deleted != null)
   {
        db.Set<E_D_G_TypeTempExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public E_G_Link_BuildFeildExcelTable InsertE_G_Link_BuildFeildExcelTable(E_G_Link_BuildFeildExcelTable Tbl) 
{
Tbl.IDFeildExcel = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_G_Link_BuildFeildExcelTable UpdateE_G_Link_BuildFeildExcelTable(E_G_Link_BuildFeildExcelTable Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_G_Link_BuildFeildExcelTable(int  IDFeildExcel) 
   {
 var Deleted = db.Set<E_G_Link_BuildFeildExcelTable>().Find(IDFeildExcel);
    if (Deleted != null)
   {
        db.Set<E_G_Link_BuildFeildExcelTable>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public E_G_Link_CreateExcelByTable InsertE_G_Link_CreateExcelByTable(E_G_Link_CreateExcelByTable Tbl) 
{
Tbl.IDLnkExcel = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_G_Link_CreateExcelByTable UpdateE_G_Link_CreateExcelByTable(E_G_Link_CreateExcelByTable Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_G_Link_CreateExcelByTable(int  IDLnkExcel) 
   {
 var Deleted = db.Set<E_G_Link_CreateExcelByTable>().Find(IDLnkExcel);
    if (Deleted != null)
   {
        db.Set<E_G_Link_CreateExcelByTable>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public E_I_ContainerDataExcel InsertE_I_ContainerDataExcel(E_I_ContainerDataExcel Tbl) 
{
Tbl.IDContExcel = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_I_ContainerDataExcel UpdateE_I_ContainerDataExcel(E_I_ContainerDataExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_I_ContainerDataExcel(int  IDContExcel) 
   {
 var Deleted = db.Set<E_I_ContainerDataExcel>().Find(IDContExcel);
    if (Deleted != null)
   {
        db.Set<E_I_ContainerDataExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public E_I_LogUploadExcel InsertE_I_LogUploadExcel(E_I_LogUploadExcel Tbl) 
{
Tbl.IDExcel = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public E_I_LogUploadExcel UpdateE_I_LogUploadExcel(E_I_LogUploadExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteE_I_LogUploadExcel(int  IDExcel) 
   {
 var Deleted = db.Set<E_I_LogUploadExcel>().Find(IDExcel);
    if (Deleted != null)
   {
        db.Set<E_I_LogUploadExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public EQ_I_ContainerDataExcel InsertEQ_I_ContainerDataExcel(EQ_I_ContainerDataExcel Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public EQ_I_ContainerDataExcel UpdateEQ_I_ContainerDataExcel(EQ_I_ContainerDataExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_BRANCH InsertG_BRANCH(G_BRANCH Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_BRANCH UpdateG_BRANCH(G_BRANCH Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_BRANCH( int BRA_CODE,int COMP_CODE) 
   {
 var Deleted = db.Set<G_BRANCH>().Find( BRA_CODE , COMP_CODE);
    if (Deleted != null)
   {
        db.Set<G_BRANCH>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Codes InsertG_Codes(G_Codes Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Codes UpdateG_Codes(G_Codes Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Codes(int  ID) 
   {
 var Deleted = db.Set<G_Codes>().Find(ID);
    if (Deleted != null)
   {
        db.Set<G_Codes>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_COMPANY InsertG_COMPANY(G_COMPANY Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_COMPANY UpdateG_COMPANY(G_COMPANY Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_COMPANY(int  COMP_CODE) 
   {
 var Deleted = db.Set<G_COMPANY>().Find(COMP_CODE);
    if (Deleted != null)
   {
        db.Set<G_COMPANY>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_CONTROL InsertG_CONTROL(G_CONTROL Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_CONTROL UpdateG_CONTROL(G_CONTROL Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_CONTROL( int COMP_CODE,int FIN_YEAR) 
   {
 var Deleted = db.Set<G_CONTROL>().Find( COMP_CODE , FIN_YEAR);
    if (Deleted != null)
   {
        db.Set<G_CONTROL>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Data_Redis InsertG_Data_Redis(G_Data_Redis Tbl) 
{
Tbl.Id = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Data_Redis UpdateG_Data_Redis(G_Data_Redis Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Data_Redis(int  Id) 
   {
 var Deleted = db.Set<G_Data_Redis>().Find(Id);
    if (Deleted != null)
   {
        db.Set<G_Data_Redis>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_DefTempExcel InsertG_DefTempExcel(G_DefTempExcel Tbl) 
{
Tbl.ID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_DefTempExcel UpdateG_DefTempExcel(G_DefTempExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_DefTempExcel(int  ID) 
   {
 var Deleted = db.Set<G_DefTempExcel>().Find(ID);
    if (Deleted != null)
   {
        db.Set<G_DefTempExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Employees InsertG_Employees(G_Employees Tbl) 
{
Tbl.EmpID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Employees UpdateG_Employees(G_Employees Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Employees(int  EmpID) 
   {
 var Deleted = db.Set<G_Employees>().Find(EmpID);
    if (Deleted != null)
   {
        db.Set<G_Employees>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_I_DayShift InsertG_I_DayShift(G_I_DayShift Tbl) 
{
Tbl.DayShiftID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_I_DayShift UpdateG_I_DayShift(G_I_DayShift Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_I_DayShift(int  DayShiftID) 
   {
 var Deleted = db.Set<G_I_DayShift>().Find(DayShiftID);
    if (Deleted != null)
   {
        db.Set<G_I_DayShift>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Log_Device InsertG_Log_Device(G_Log_Device Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Log_Device UpdateG_Log_Device(G_Log_Device Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Log_Device(string  ID_Device) 
   {
 var Deleted = db.Set<G_Log_Device>().Find(ID_Device);
    if (Deleted != null)
   {
        db.Set<G_Log_Device>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Log_User InsertG_Log_User(G_Log_User Tbl) 
{
Tbl.LogID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Log_User UpdateG_Log_User(G_Log_User Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Log_User(int  LogID) 
   {
 var Deleted = db.Set<G_Log_User>().Find(LogID);
    if (Deleted != null)
   {
        db.Set<G_Log_User>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_MODULES InsertG_MODULES(G_MODULES Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_MODULES UpdateG_MODULES(G_MODULES Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_MODULES(string  MODULE_CODE) 
   {
 var Deleted = db.Set<G_MODULES>().Find(MODULE_CODE);
    if (Deleted != null)
   {
        db.Set<G_MODULES>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Resources InsertG_Resources(G_Resources Tbl) 
{
Tbl.IDRes = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Resources UpdateG_Resources(G_Resources Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Resources(string  KeyRes) 
   {
 var Deleted = db.Set<G_Resources>().Find(KeyRes);
    if (Deleted != null)
   {
        db.Set<G_Resources>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Role InsertG_Role(G_Role Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Role UpdateG_Role(G_Role Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Role(int  RoleId) 
   {
 var Deleted = db.Set<G_Role>().Find(RoleId);
    if (Deleted != null)
   {
        db.Set<G_Role>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_RoleModule InsertG_RoleModule(G_RoleModule Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_RoleModule UpdateG_RoleModule(G_RoleModule Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_RoleModule( string MODULE_CODE,int RoleId) 
   {
 var Deleted = db.Set<G_RoleModule>().Find( MODULE_CODE , RoleId);
    if (Deleted != null)
   {
        db.Set<G_RoleModule>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_RoleUsers InsertG_RoleUsers(G_RoleUsers Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_RoleUsers UpdateG_RoleUsers(G_RoleUsers Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_RoleUsers( int CompCode,int IDUser,int RoleId) 
   {
 var Deleted = db.Set<G_RoleUsers>().Find( CompCode , IDUser , RoleId);
    if (Deleted != null)
   {
        db.Set<G_RoleUsers>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Run_Trigger InsertG_Run_Trigger(G_Run_Trigger Tbl) 
{
Tbl.Id = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Run_Trigger UpdateG_Run_Trigger(G_Run_Trigger Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Run_Trigger(int  Id) 
   {
 var Deleted = db.Set<G_Run_Trigger>().Find(Id);
    if (Deleted != null)
   {
        db.Set<G_Run_Trigger>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Run_Trigger_Waiting InsertG_Run_Trigger_Waiting(G_Run_Trigger_Waiting Tbl) 
{
Tbl.Id = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Run_Trigger_Waiting UpdateG_Run_Trigger_Waiting(G_Run_Trigger_Waiting Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Run_Trigger_Waiting(int  Id) 
   {
 var Deleted = db.Set<G_Run_Trigger_Waiting>().Find(Id);
    if (Deleted != null)
   {
        db.Set<G_Run_Trigger_Waiting>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_SearchForm InsertG_SearchForm(G_SearchForm Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_SearchForm UpdateG_SearchForm(G_SearchForm Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_SearchForm(string  SearchFormCode) 
   {
 var Deleted = db.Set<G_SearchForm>().Find(SearchFormCode);
    if (Deleted != null)
   {
        db.Set<G_SearchForm>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_SearchFormModule InsertG_SearchFormModule(G_SearchFormModule Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_SearchFormModule UpdateG_SearchFormModule(G_SearchFormModule Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_SearchFormModule( string ControlCode,string ModuleCode,string SubSystemCode,string SystemCode) 
   {
 var Deleted = db.Set<G_SearchFormModule>().Find( ControlCode , ModuleCode , SubSystemCode , SystemCode);
    if (Deleted != null)
   {
        db.Set<G_SearchFormModule>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_SearchFormSetting InsertG_SearchFormSetting(G_SearchFormSetting Tbl) 
{
Tbl.SearchFormSettingID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_SearchFormSetting UpdateG_SearchFormSetting(G_SearchFormSetting Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_SearchFormSetting(int  SearchFormSettingID) 
   {
 var Deleted = db.Set<G_SearchFormSetting>().Find(SearchFormSettingID);
    if (Deleted != null)
   {
        db.Set<G_SearchFormSetting>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Settings_Device InsertG_Settings_Device(G_Settings_Device Tbl) 
{
Tbl.ID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Settings_Device UpdateG_Settings_Device(G_Settings_Device Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Settings_Device(int  ID) 
   {
 var Deleted = db.Set<G_Settings_Device>().Find(ID);
    if (Deleted != null)
   {
        db.Set<G_Settings_Device>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_Tr_Archive InsertG_Tr_Archive(G_Tr_Archive Tbl) 
{
Tbl.ArchiveID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_Tr_Archive UpdateG_Tr_Archive(G_Tr_Archive Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_Tr_Archive(int  ArchiveID) 
   {
 var Deleted = db.Set<G_Tr_Archive>().Find(ArchiveID);
    if (Deleted != null)
   {
        db.Set<G_Tr_Archive>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_TransCounter InsertG_TransCounter(G_TransCounter Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_TransCounter UpdateG_TransCounter(G_TransCounter Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_TransCounter( int BranchCode,int CompCode,int FinYear,int PeriodCode,string TransType) 
   {
 var Deleted = db.Set<G_TransCounter>().Find( BranchCode , CompCode , FinYear , PeriodCode , TransType);
    if (Deleted != null)
   {
        db.Set<G_TransCounter>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_TransCounterSetting InsertG_TransCounterSetting(G_TransCounterSetting Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_TransCounterSetting UpdateG_TransCounterSetting(G_TransCounterSetting Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteG_TransCounterSetting( int CompCode,string TransType) 
   {
 var Deleted = db.Set<G_TransCounterSetting>().Find( CompCode , TransType);
    if (Deleted != null)
   {
        db.Set<G_TransCounterSetting>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_TypeEmployees InsertG_TypeEmployees(G_TypeEmployees Tbl) 
{
Tbl.IDTypeEmp = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_TypeEmployees UpdateG_TypeEmployees(G_TypeEmployees Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_TypeEmployees(int  IDTypeEmp) 
   {
 var Deleted = db.Set<G_TypeEmployees>().Find(IDTypeEmp);
    if (Deleted != null)
   {
        db.Set<G_TypeEmployees>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_TypeTempExcel InsertG_TypeTempExcel(G_TypeTempExcel Tbl) 
{
Tbl.IDTypeTemp = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_TypeTempExcel UpdateG_TypeTempExcel(G_TypeTempExcel Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_TypeTempExcel(int  IDTypeTemp) 
   {
 var Deleted = db.Set<G_TypeTempExcel>().Find(IDTypeTemp);
    if (Deleted != null)
   {
        db.Set<G_TypeTempExcel>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public G_USERS InsertG_USERS(G_USERS Tbl) 
{
Tbl.ID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public G_USERS UpdateG_USERS(G_USERS Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteG_USERS(int  ID) 
   {
 var Deleted = db.Set<G_USERS>().Find(ID);
    if (Deleted != null)
   {
        db.Set<G_USERS>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public GQ_USERS InsertGQ_USERS(GQ_USERS Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public GQ_USERS UpdateGQ_USERS(GQ_USERS Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_Control InsertI_Control(I_Control Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_Control UpdateI_Control(I_Control Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_Control(int  CompCode) 
   {
 var Deleted = db.Set<I_Control>().Find(CompCode);
    if (Deleted != null)
   {
        db.Set<I_Control>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_ExternalLabor InsertI_TR_ExternalLabor(I_TR_ExternalLabor Tbl) 
{
Tbl.TransactionID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_ExternalLabor UpdateI_TR_ExternalLabor(I_TR_ExternalLabor Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_ExternalLabor(int  TransactionID) 
   {
 var Deleted = db.Set<I_TR_ExternalLabor>().Find(TransactionID);
    if (Deleted != null)
   {
        db.Set<I_TR_ExternalLabor>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_FinancialTransactions InsertI_TR_FinancialTransactions(I_TR_FinancialTransactions Tbl) 
{
Tbl.TransactionID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_FinancialTransactions UpdateI_TR_FinancialTransactions(I_TR_FinancialTransactions Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_FinancialTransactions(int  TransactionID) 
   {
 var Deleted = db.Set<I_TR_FinancialTransactions>().Find(TransactionID);
    if (Deleted != null)
   {
        db.Set<I_TR_FinancialTransactions>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_PurchaseDetails InsertI_TR_PurchaseDetails(I_TR_PurchaseDetails Tbl) 
{
Tbl.PurchaseDetailID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_PurchaseDetails UpdateI_TR_PurchaseDetails(I_TR_PurchaseDetails Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_PurchaseDetails(int  PurchaseDetailID) 
   {
 var Deleted = db.Set<I_TR_PurchaseDetails>().Find(PurchaseDetailID);
    if (Deleted != null)
   {
        db.Set<I_TR_PurchaseDetails>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_Purchases InsertI_TR_Purchases(I_TR_Purchases Tbl) 
{
Tbl.PurchaseID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_Purchases UpdateI_TR_Purchases(I_TR_Purchases Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_Purchases(int  PurchaseID) 
   {
 var Deleted = db.Set<I_TR_Purchases>().Find(PurchaseID);
    if (Deleted != null)
   {
        db.Set<I_TR_Purchases>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_SaleDetails InsertI_TR_SaleDetails(I_TR_SaleDetails Tbl) 
{
Tbl.SaleDetailID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_SaleDetails UpdateI_TR_SaleDetails(I_TR_SaleDetails Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_SaleDetails(int  SaleDetailID) 
   {
 var Deleted = db.Set<I_TR_SaleDetails>().Find(SaleDetailID);
    if (Deleted != null)
   {
        db.Set<I_TR_SaleDetails>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_Sales InsertI_TR_Sales(I_TR_Sales Tbl) 
{
Tbl.SaleID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_Sales UpdateI_TR_Sales(I_TR_Sales Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_Sales(int  SaleID) 
   {
 var Deleted = db.Set<I_TR_Sales>().Find(SaleID);
    if (Deleted != null)
   {
        db.Set<I_TR_Sales>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public I_TR_TableReservations InsertI_TR_TableReservations(I_TR_TableReservations Tbl) 
{
Tbl.ReservationID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public I_TR_TableReservations UpdateI_TR_TableReservations(I_TR_TableReservations Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteI_TR_TableReservations(int  ReservationID) 
   {
 var Deleted = db.Set<I_TR_TableReservations>().Find(ReservationID);
    if (Deleted != null)
   {
        db.Set<I_TR_TableReservations>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public IQ_DisplayAllItemsActive InsertIQ_DisplayAllItemsActive(IQ_DisplayAllItemsActive Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_DisplayAllItemsActive UpdateIQ_DisplayAllItemsActive(IQ_DisplayAllItemsActive Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_DisplayAllItemsUnites InsertIQ_DisplayAllItemsUnites(IQ_DisplayAllItemsUnites Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_DisplayAllItemsUnites UpdateIQ_DisplayAllItemsUnites(IQ_DisplayAllItemsUnites Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxInvHeader InsertIQ_EGTaxInvHeader(IQ_EGTaxInvHeader Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxInvHeader UpdateIQ_EGTaxInvHeader(IQ_EGTaxInvHeader Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxInvItems InsertIQ_EGTaxInvItems(IQ_EGTaxInvItems Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxInvItems UpdateIQ_EGTaxInvItems(IQ_EGTaxInvItems Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxReceiptHeader InsertIQ_EGTaxReceiptHeader(IQ_EGTaxReceiptHeader Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_EGTaxReceiptHeader UpdateIQ_EGTaxReceiptHeader(IQ_EGTaxReceiptHeader Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_Employees InsertIQ_G_Employees(IQ_G_Employees Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_Employees UpdateIQ_G_Employees(IQ_G_Employees Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_Log_Device InsertIQ_G_Log_Device(IQ_G_Log_Device Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_Log_Device UpdateIQ_G_Log_Device(IQ_G_Log_Device Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleModule InsertIQ_G_RoleModule(IQ_G_RoleModule Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleModule UpdateIQ_G_RoleModule(IQ_G_RoleModule Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleUsersAllDataComp InsertIQ_G_RoleUsersAllDataComp(IQ_G_RoleUsersAllDataComp Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleUsersAllDataComp UpdateIQ_G_RoleUsersAllDataComp(IQ_G_RoleUsersAllDataComp Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleUsersComp InsertIQ_G_RoleUsersComp(IQ_G_RoleUsersComp Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_RoleUsersComp UpdateIQ_G_RoleUsersComp(IQ_G_RoleUsersComp Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_TypeEmployeesByUsing InsertIQ_G_TypeEmployeesByUsing(IQ_G_TypeEmployeesByUsing Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_G_TypeEmployeesByUsing UpdateIQ_G_TypeEmployeesByUsing(IQ_G_TypeEmployeesByUsing Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_GetItemInfo InsertIQ_GetItemInfo(IQ_GetItemInfo Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_GetItemInfo UpdateIQ_GetItemInfo(IQ_GetItemInfo Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_I_Control InsertIQ_I_Control(IQ_I_Control Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_I_Control UpdateIQ_I_Control(IQ_I_Control Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ItemQtyHanging InsertIQ_ItemQtyHanging(IQ_ItemQtyHanging Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ItemQtyHanging UpdateIQ_ItemQtyHanging(IQ_ItemQtyHanging Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ItemUnites InsertIQ_ItemUnites(IQ_ItemUnites Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ItemUnites UpdateIQ_ItemUnites(IQ_ItemUnites Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_KSATaxInvHeader InsertIQ_KSATaxInvHeader(IQ_KSATaxInvHeader Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_KSATaxInvHeader UpdateIQ_KSATaxInvHeader(IQ_KSATaxInvHeader Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_KSATaxInvItems InsertIQ_KSATaxInvItems(IQ_KSATaxInvItems Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_KSATaxInvItems UpdateIQ_KSATaxInvItems(IQ_KSATaxInvItems Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_FinancialTransactions InsertIQ_TR_FinancialTransactions(IQ_TR_FinancialTransactions Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_FinancialTransactions UpdateIQ_TR_FinancialTransactions(IQ_TR_FinancialTransactions Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_FinancialTransactionsPateners InsertIQ_TR_FinancialTransactionsPateners(IQ_TR_FinancialTransactionsPateners Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_FinancialTransactionsPateners UpdateIQ_TR_FinancialTransactionsPateners(IQ_TR_FinancialTransactionsPateners Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Link_FinancialTransactions_Inv InsertIQ_TR_Link_FinancialTransactions_Inv(IQ_TR_Link_FinancialTransactions_Inv Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Link_FinancialTransactions_Inv UpdateIQ_TR_Link_FinancialTransactions_Inv(IQ_TR_Link_FinancialTransactions_Inv Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Link_FinancialTransactions_Pur InsertIQ_TR_Link_FinancialTransactions_Pur(IQ_TR_Link_FinancialTransactions_Pur Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Link_FinancialTransactions_Pur UpdateIQ_TR_Link_FinancialTransactions_Pur(IQ_TR_Link_FinancialTransactions_Pur Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_PurchaseDetails InsertIQ_TR_PurchaseDetails(IQ_TR_PurchaseDetails Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_PurchaseDetails UpdateIQ_TR_PurchaseDetails(IQ_TR_PurchaseDetails Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Purchases InsertIQ_TR_Purchases(IQ_TR_Purchases Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Purchases UpdateIQ_TR_Purchases(IQ_TR_Purchases Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_SaleDetails InsertIQ_TR_SaleDetails(IQ_TR_SaleDetails Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_SaleDetails UpdateIQ_TR_SaleDetails(IQ_TR_SaleDetails Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Sales InsertIQ_TR_Sales(IQ_TR_Sales Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_TR_Sales UpdateIQ_TR_Sales(IQ_TR_Sales Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_View_JobOrder InsertIQ_View_JobOrder(IQ_View_JobOrder Tbl) 
{
Tbl.SaleID = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_View_JobOrder UpdateIQ_View_JobOrder(IQ_View_JobOrder Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_View_User_Log InsertIQ_View_User_Log(IQ_View_User_Log Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_View_User_Log UpdateIQ_View_User_Log(IQ_View_User_Log Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ViewItems InsertIQ_ViewItems(IQ_ViewItems Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public IQ_ViewItems UpdateIQ_ViewItems(IQ_ViewItems Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public PurchaseMasterDetail InsertPurchaseMasterDetail(PurchaseMasterDetail Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public PurchaseMasterDetail UpdatePurchaseMasterDetail(PurchaseMasterDetail Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public sysdiagrams Insertsysdiagrams(sysdiagrams Tbl) 
{
Tbl.diagram_id = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public sysdiagrams Updatesysdiagrams(sysdiagrams Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void Deletesysdiagrams(int  diagram_id) 
   {
 var Deleted = db.Set<sysdiagrams>().Find(diagram_id);
    if (Deleted != null)
   {
        db.Set<sysdiagrams>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public TempCustomer InsertTempCustomer(TempCustomer Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public TempCustomer UpdateTempCustomer(TempCustomer Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public VAT_PERIOD InsertVAT_PERIOD(VAT_PERIOD Tbl) 
{
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public VAT_PERIOD UpdateVAT_PERIOD(VAT_PERIOD Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
  public void DeleteVAT_PERIOD( int COMP_CODE,int PERIOD_CODE,int VAT_YEAR) 
   {
 var Deleted = db.Set<VAT_PERIOD>().Find( COMP_CODE , PERIOD_CODE , VAT_YEAR);
    if (Deleted != null)
   {
        db.Set<VAT_PERIOD>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public Z_G_Lnk_Build_DetailJournal InsertZ_G_Lnk_Build_DetailJournal(Z_G_Lnk_Build_DetailJournal Tbl) 
{
Tbl.ID_Build = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public Z_G_Lnk_Build_DetailJournal UpdateZ_G_Lnk_Build_DetailJournal(Z_G_Lnk_Build_DetailJournal Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteZ_G_Lnk_Build_DetailJournal(int  ID_Build) 
   {
 var Deleted = db.Set<Z_G_Lnk_Build_DetailJournal>().Find(ID_Build);
    if (Deleted != null)
   {
        db.Set<Z_G_Lnk_Build_DetailJournal>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public Z_G_Lnk_Create_DirectJournal InsertZ_G_Lnk_Create_DirectJournal(Z_G_Lnk_Create_DirectJournal Tbl) 
{
Tbl.ID_Lnk = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public Z_G_Lnk_Create_DirectJournal UpdateZ_G_Lnk_Create_DirectJournal(Z_G_Lnk_Create_DirectJournal Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteZ_G_Lnk_Create_DirectJournal(int  ID_Lnk) 
   {
 var Deleted = db.Set<Z_G_Lnk_Create_DirectJournal>().Find(ID_Lnk);
    if (Deleted != null)
   {
        db.Set<Z_G_Lnk_Create_DirectJournal>().Remove(Deleted);
        db.SaveChanges();
    }
}
 public Z_G_Lnk_CreateAccount InsertZ_G_Lnk_CreateAccount(Z_G_Lnk_CreateAccount Tbl) 
{
Tbl.ID_Lnk = null ;
 var Res = db.Add(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
 public Z_G_Lnk_CreateAccount UpdateZ_G_Lnk_CreateAccount(Z_G_Lnk_CreateAccount Tbl) 
{
 var Res = db.Update(Tbl).Entity;
  db.SaveChanges();
  return Res;
}
public void DeleteZ_G_Lnk_CreateAccount(int  ID_Lnk) 
   {
 var Deleted = db.Set<Z_G_Lnk_CreateAccount>().Find(ID_Lnk);
    if (Deleted != null)
   {
        db.Set<Z_G_Lnk_CreateAccount>().Remove(Deleted);
        db.SaveChanges();
    }
}
}

}
