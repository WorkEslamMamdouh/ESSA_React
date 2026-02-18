using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Core.UI.Repository.Models;
using Newtonsoft.Json;
namespace Core.UI.Repository
{
public partial class ModelDbContext : DbContext
{
  public ModelDbContext()
        {
        }

 public ModelDbContext(DbContextOptions<ModelDbContext> options)
            : base(options)
        {
        }
 public virtual DbSet<A_ACCOUNT> A_ACCOUNT { get; set; } 
 public virtual DbSet<A_ACCOUNT_YEAR> A_ACCOUNT_YEAR { get; set; } 
 public virtual DbSet<A_JOURNAL_DETAIL> A_JOURNAL_DETAIL { get; set; } 
 public virtual DbSet<A_JOURNAL_HEADER> A_JOURNAL_HEADER { get; set; } 
 public virtual DbSet<A_TR_ReceiptNote> A_TR_ReceiptNote { get; set; } 
 public virtual DbSet<AQ_A_Account> AQ_A_Account { get; set; } 
 public virtual DbSet<AQ_JOURNAL_DETAIL> AQ_JOURNAL_DETAIL { get; set; } 
 public virtual DbSet<AQ_JOURNAL_HEADER> AQ_JOURNAL_HEADER { get; set; } 
 public virtual DbSet<CheckTransactionsUnPosted> CheckTransactionsUnPosted { get; set; } 
 public virtual DbSet<D_A_CashTypes> D_A_CashTypes { get; set; } 
 public virtual DbSet<D_A_FinancialType> D_A_FinancialType { get; set; } 
 public virtual DbSet<D_A_Suppliers> D_A_Suppliers { get; set; } 
 public virtual DbSet<D_A_VatType> D_A_VatType { get; set; } 
 public virtual DbSet<D_Customer> D_Customer { get; set; } 
 public virtual DbSet<D_G_Currency> D_G_Currency { get; set; } 
 public virtual DbSet<D_G_FamilyZone> D_G_FamilyZone { get; set; } 
 public virtual DbSet<D_G_Nationality> D_G_Nationality { get; set; } 
 public virtual DbSet<D_G_Store> D_G_Store { get; set; } 
 public virtual DbSet<D_G_TaxAddDed> D_G_TaxAddDed { get; set; } 
 public virtual DbSet<D_G_Zones> D_G_Zones { get; set; } 
 public virtual DbSet<D_I_Category> D_I_Category { get; set; } 
 public virtual DbSet<D_I_ItemFamily> D_I_ItemFamily { get; set; } 
 public virtual DbSet<D_I_Items> D_I_Items { get; set; } 
 public virtual DbSet<D_I_Items_Temp> D_I_Items_Temp { get; set; } 
 public virtual DbSet<D_I_ItemTaxEG> D_I_ItemTaxEG { get; set; } 
 public virtual DbSet<D_I_ItemUnits> D_I_ItemUnits { get; set; } 
 public virtual DbSet<D_I_Tables> D_I_Tables { get; set; } 
 public virtual DbSet<D_I_Units> D_I_Units { get; set; } 
 public virtual DbSet<DQ_A_Supplier> DQ_A_Supplier { get; set; } 
 public virtual DbSet<E_D_G_CreateTempExcel> E_D_G_CreateTempExcel { get; set; } 
 public virtual DbSet<E_D_G_TypeTempExcel> E_D_G_TypeTempExcel { get; set; } 
 public virtual DbSet<E_G_Link_BuildFeildExcelTable> E_G_Link_BuildFeildExcelTable { get; set; } 
 public virtual DbSet<E_G_Link_CreateExcelByTable> E_G_Link_CreateExcelByTable { get; set; } 
 public virtual DbSet<E_I_ContainerDataExcel> E_I_ContainerDataExcel { get; set; } 
 public virtual DbSet<E_I_LogUploadExcel> E_I_LogUploadExcel { get; set; } 
 public virtual DbSet<EQ_I_ContainerDataExcel> EQ_I_ContainerDataExcel { get; set; } 
 public virtual DbSet<G_BRANCH> G_BRANCH { get; set; } 
 public virtual DbSet<G_Codes> G_Codes { get; set; } 
 public virtual DbSet<G_COMPANY> G_COMPANY { get; set; } 
 public virtual DbSet<G_CONTROL> G_CONTROL { get; set; } 
 public virtual DbSet<G_Data_Redis> G_Data_Redis { get; set; } 
 public virtual DbSet<G_DefTempExcel> G_DefTempExcel { get; set; } 
 public virtual DbSet<G_Employees> G_Employees { get; set; } 
 public virtual DbSet<G_I_DayShift> G_I_DayShift { get; set; } 
 public virtual DbSet<G_Log_Device> G_Log_Device { get; set; } 
 public virtual DbSet<G_Log_User> G_Log_User { get; set; } 
 public virtual DbSet<G_MODULES> G_MODULES { get; set; } 
 public virtual DbSet<G_Resources> G_Resources { get; set; } 
 public virtual DbSet<G_Role> G_Role { get; set; } 
 public virtual DbSet<G_RoleModule> G_RoleModule { get; set; } 
 public virtual DbSet<G_RoleUsers> G_RoleUsers { get; set; } 
 public virtual DbSet<G_Run_Trigger> G_Run_Trigger { get; set; } 
 public virtual DbSet<G_Run_Trigger_Waiting> G_Run_Trigger_Waiting { get; set; } 
 public virtual DbSet<G_SearchForm> G_SearchForm { get; set; } 
 public virtual DbSet<G_SearchFormModule> G_SearchFormModule { get; set; } 
 public virtual DbSet<G_SearchFormSetting> G_SearchFormSetting { get; set; } 
 public virtual DbSet<G_Settings_Device> G_Settings_Device { get; set; } 
 public virtual DbSet<G_Tr_Archive> G_Tr_Archive { get; set; } 
 public virtual DbSet<G_TransCounter> G_TransCounter { get; set; } 
 public virtual DbSet<G_TransCounterSetting> G_TransCounterSetting { get; set; } 
 public virtual DbSet<G_TypeEmployees> G_TypeEmployees { get; set; } 
 public virtual DbSet<G_TypeTempExcel> G_TypeTempExcel { get; set; } 
 public virtual DbSet<G_USERS> G_USERS { get; set; } 
 public virtual DbSet<GQ_USERS> GQ_USERS { get; set; } 
 public virtual DbSet<I_Control> I_Control { get; set; } 
 public virtual DbSet<I_TR_ExternalLabor> I_TR_ExternalLabor { get; set; } 
 public virtual DbSet<I_TR_FinancialTransactions> I_TR_FinancialTransactions { get; set; } 
 public virtual DbSet<I_TR_PurchaseDetails> I_TR_PurchaseDetails { get; set; } 
 public virtual DbSet<I_TR_Purchases> I_TR_Purchases { get; set; } 
 public virtual DbSet<I_TR_SaleDetails> I_TR_SaleDetails { get; set; } 
 public virtual DbSet<I_TR_Sales> I_TR_Sales { get; set; } 
 public virtual DbSet<I_TR_TableReservations> I_TR_TableReservations { get; set; } 
 public virtual DbSet<IQ_DisplayAllItemsActive> IQ_DisplayAllItemsActive { get; set; } 
 public virtual DbSet<IQ_DisplayAllItemsUnites> IQ_DisplayAllItemsUnites { get; set; } 
 public virtual DbSet<IQ_EGTaxInvHeader> IQ_EGTaxInvHeader { get; set; } 
 public virtual DbSet<IQ_EGTaxInvItems> IQ_EGTaxInvItems { get; set; } 
 public virtual DbSet<IQ_EGTaxReceiptHeader> IQ_EGTaxReceiptHeader { get; set; } 
 public virtual DbSet<IQ_G_Employees> IQ_G_Employees { get; set; } 
 public virtual DbSet<IQ_G_Log_Device> IQ_G_Log_Device { get; set; } 
 public virtual DbSet<IQ_G_RoleModule> IQ_G_RoleModule { get; set; } 
 public virtual DbSet<IQ_G_RoleUsersAllDataComp> IQ_G_RoleUsersAllDataComp { get; set; } 
 public virtual DbSet<IQ_G_RoleUsersComp> IQ_G_RoleUsersComp { get; set; } 
 public virtual DbSet<IQ_G_TypeEmployeesByUsing> IQ_G_TypeEmployeesByUsing { get; set; } 
 public virtual DbSet<IQ_GetItemInfo> IQ_GetItemInfo { get; set; } 
 public virtual DbSet<IQ_I_Control> IQ_I_Control { get; set; } 
 public virtual DbSet<IQ_ItemQtyHanging> IQ_ItemQtyHanging { get; set; } 
 public virtual DbSet<IQ_ItemUnites> IQ_ItemUnites { get; set; } 
 public virtual DbSet<IQ_KSATaxInvHeader> IQ_KSATaxInvHeader { get; set; } 
 public virtual DbSet<IQ_KSATaxInvItems> IQ_KSATaxInvItems { get; set; } 
 public virtual DbSet<IQ_TR_FinancialTransactions> IQ_TR_FinancialTransactions { get; set; } 
 public virtual DbSet<IQ_TR_FinancialTransactionsPateners> IQ_TR_FinancialTransactionsPateners { get; set; } 
 public virtual DbSet<IQ_TR_Link_FinancialTransactions_Inv> IQ_TR_Link_FinancialTransactions_Inv { get; set; } 
 public virtual DbSet<IQ_TR_Link_FinancialTransactions_Pur> IQ_TR_Link_FinancialTransactions_Pur { get; set; } 
 public virtual DbSet<IQ_TR_PurchaseDetails> IQ_TR_PurchaseDetails { get; set; } 
 public virtual DbSet<IQ_TR_Purchases> IQ_TR_Purchases { get; set; } 
 public virtual DbSet<IQ_TR_SaleDetails> IQ_TR_SaleDetails { get; set; } 
 public virtual DbSet<IQ_TR_Sales> IQ_TR_Sales { get; set; } 
 public virtual DbSet<IQ_View_JobOrder> IQ_View_JobOrder { get; set; } 
 public virtual DbSet<IQ_View_User_Log> IQ_View_User_Log { get; set; } 
 public virtual DbSet<IQ_ViewItems> IQ_ViewItems { get; set; } 
 public virtual DbSet<PurchaseMasterDetail> PurchaseMasterDetail { get; set; } 
 public virtual DbSet<sysdiagrams> sysdiagrams { get; set; } 
 public virtual DbSet<TempCustomer> TempCustomer { get; set; } 
 public virtual DbSet<VAT_PERIOD> VAT_PERIOD { get; set; } 
 public virtual DbSet<Z_G_Lnk_Build_DetailJournal> Z_G_Lnk_Build_DetailJournal { get; set; } 
 public virtual DbSet<Z_G_Lnk_Create_DirectJournal> Z_G_Lnk_Create_DirectJournal { get; set; } 
 public virtual DbSet<Z_G_Lnk_CreateAccount> Z_G_Lnk_CreateAccount { get; set; } 

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                        {
                                if (!optionsBuilder.IsConfigured)
                                { 
                                    optionsBuilder.UseSqlServer(ConnectionString.connectionString);
                                }
                        }
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
          modelBuilder.UseCollation("Arabic_CI_AS");
modelBuilder.Entity<A_ACCOUNT>(entity =>
            {
 entity.HasKey(e => new {
e.ACC_CODE, e.COMP_CODE });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<A_ACCOUNT_YEAR>(entity =>
            {
 entity.HasKey(e => new {
e.ACC_CODE, e.COMP_CODE, e.FIN_YEAR });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<A_JOURNAL_DETAIL>(entity =>
            {
 entity.HasKey(e => e.VoucherDetailID); 
 entity.Property(e => e.VoucherDetailID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<A_JOURNAL_HEADER>(entity =>
            {
 entity.HasKey(e => e.VoucherID); 
 entity.Property(e => e.VoucherID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<A_TR_ReceiptNote>(entity =>
            {
 entity.HasKey(e => e.TransactionID); 
 entity.Property(e => e.TransactionID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<AQ_A_Account>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<AQ_JOURNAL_DETAIL>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<AQ_JOURNAL_HEADER>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<CheckTransactionsUnPosted>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_A_CashTypes>(entity =>
            {
 entity.HasKey(e => e.CashTypeID); 
 entity.Property(e => e.CashTypeID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_A_FinancialType>(entity =>
            {
 entity.HasKey(e => e.FinancialTypeID); 
 entity.Property(e => e.FinancialTypeID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_A_Suppliers>(entity =>
            {
 entity.HasKey(e => e.SupplierID); 
 entity.Property(e => e.SupplierID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_A_VatType>(entity =>
            {
 entity.HasKey(e => e.VatTypeID); 
 entity.Property(e => e.VatTypeID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_Customer>(entity =>
            {
 entity.HasKey(e => e.CustomerId); 
 entity.Property(e => e.CustomerId).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_Currency>(entity =>
            {
 entity.HasKey(e => e.CurrencyID); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_FamilyZone>(entity =>
            {
 entity.HasKey(e => e.FamilyZoneID); 
 entity.Property(e => e.FamilyZoneID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_Nationality>(entity =>
            {
 entity.HasKey(e => e.NationalityID); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_Store>(entity =>
            {
 entity.HasKey(e => e.StoreID); 
 entity.Property(e => e.StoreID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_TaxAddDed>(entity =>
            {
 entity.HasKey(e => e.TaxID); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_G_Zones>(entity =>
            {
 entity.HasKey(e => e.ZoneID); 
 entity.Property(e => e.ZoneID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_Category>(entity =>
            {
 entity.HasKey(e => e.CatID); 
 entity.Property(e => e.CatID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_ItemFamily>(entity =>
            {
 entity.HasKey(e => e.ItemFamilyID); 
 entity.Property(e => e.ItemFamilyID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_Items>(entity =>
            {
 entity.HasKey(e => e.ItemID); 
 entity.Property(e => e.ItemID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_Items_Temp>(entity =>
            {
 entity.HasNoKey(); 
 entity.Property(e => e.ItemID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_ItemTaxEG>(entity =>
            {
 entity.HasKey(e => e.ItemTaxID); 
 entity.Property(e => e.ItemTaxID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_ItemUnits>(entity =>
            {
 entity.HasKey(e => e.ItemUnitID); 
 entity.Property(e => e.ItemUnitID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_Tables>(entity =>
            {
 entity.HasKey(e => e.TableID); 
 entity.Property(e => e.TableID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<D_I_Units>(entity =>
            {
 entity.HasKey(e => e.UnitID); 
 entity.Property(e => e.UnitID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<DQ_A_Supplier>(entity =>
            {
 entity.HasNoKey(); 
 entity.Property(e => e.SupplierID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_D_G_CreateTempExcel>(entity =>
            {
 entity.HasKey(e => e.IDTempExcel); 
 entity.Property(e => e.IDTempExcel).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_D_G_TypeTempExcel>(entity =>
            {
 entity.HasKey(e => e.IDTypeTemp); 
 entity.Property(e => e.IDTypeTemp).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_G_Link_BuildFeildExcelTable>(entity =>
            {
 entity.HasKey(e => e.IDFeildExcel); 
 entity.Property(e => e.IDFeildExcel).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_G_Link_CreateExcelByTable>(entity =>
            {
 entity.HasKey(e => e.IDLnkExcel); 
 entity.Property(e => e.IDLnkExcel).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_I_ContainerDataExcel>(entity =>
            {
 entity.HasKey(e => e.IDContExcel); 
 entity.Property(e => e.IDContExcel).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<E_I_LogUploadExcel>(entity =>
            {
 entity.HasKey(e => e.IDExcel); 
 entity.Property(e => e.IDExcel).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<EQ_I_ContainerDataExcel>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_BRANCH>(entity =>
            {
 entity.HasKey(e => new {
e.BRA_CODE, e.COMP_CODE });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Codes>(entity =>
            {
 entity.HasKey(e => e.ID); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_COMPANY>(entity =>
            {
 entity.HasKey(e => e.COMP_CODE); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_CONTROL>(entity =>
            {
 entity.HasKey(e => new {
e.COMP_CODE, e.FIN_YEAR });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Data_Redis>(entity =>
            {
 entity.HasKey(e => e.Id); 
 entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_DefTempExcel>(entity =>
            {
 entity.HasKey(e => e.ID); 
 entity.Property(e => e.ID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Employees>(entity =>
            {
 entity.HasKey(e => e.EmpID); 
 entity.Property(e => e.EmpID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_I_DayShift>(entity =>
            {
 entity.HasKey(e => e.DayShiftID); 
 entity.Property(e => e.DayShiftID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Log_Device>(entity =>
            {
 entity.HasKey(e => e.ID_Device); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Log_User>(entity =>
            {
 entity.HasKey(e => e.LogID); 
 entity.Property(e => e.LogID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_MODULES>(entity =>
            {
 entity.HasKey(e => e.MODULE_CODE); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Resources>(entity =>
            {
 entity.HasKey(e => e.KeyRes); 
 entity.Property(e => e.IDRes).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Role>(entity =>
            {
 entity.HasKey(e => e.RoleId); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_RoleModule>(entity =>
            {
 entity.HasKey(e => new {
e.MODULE_CODE, e.RoleId });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_RoleUsers>(entity =>
            {
 entity.HasKey(e => new {
e.CompCode, e.IDUser, e.RoleId });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Run_Trigger>(entity =>
            {
 entity.HasKey(e => e.Id); 
 entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Run_Trigger_Waiting>(entity =>
            {
 entity.HasKey(e => e.Id); 
 entity.Property(e => e.Id).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_SearchForm>(entity =>
            {
 entity.HasKey(e => e.SearchFormCode); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_SearchFormModule>(entity =>
            {
 entity.HasKey(e => new {
e.ControlCode, e.ModuleCode, e.SubSystemCode, e.SystemCode });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_SearchFormSetting>(entity =>
            {
 entity.HasKey(e => e.SearchFormSettingID); 
 entity.Property(e => e.SearchFormSettingID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Settings_Device>(entity =>
            {
 entity.HasKey(e => e.ID); 
 entity.Property(e => e.ID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_Tr_Archive>(entity =>
            {
 entity.HasKey(e => e.ArchiveID); 
 entity.Property(e => e.ArchiveID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_TransCounter>(entity =>
            {
 entity.HasKey(e => new {
e.BranchCode, e.CompCode, e.FinYear, e.PeriodCode, e.TransType });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_TransCounterSetting>(entity =>
            {
 entity.HasKey(e => new {
e.CompCode, e.TransType });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_TypeEmployees>(entity =>
            {
 entity.HasKey(e => e.IDTypeEmp); 
 entity.Property(e => e.IDTypeEmp).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_TypeTempExcel>(entity =>
            {
 entity.HasKey(e => e.IDTypeTemp); 
 entity.Property(e => e.IDTypeTemp).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<G_USERS>(entity =>
            {
 entity.HasKey(e => e.ID); 
 entity.Property(e => e.ID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<GQ_USERS>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_Control>(entity =>
            {
 entity.HasKey(e => e.CompCode); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_ExternalLabor>(entity =>
            {
 entity.HasKey(e => e.TransactionID); 
 entity.Property(e => e.TransactionID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_FinancialTransactions>(entity =>
            {
 entity.HasKey(e => e.TransactionID); 
 entity.Property(e => e.TransactionID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_PurchaseDetails>(entity =>
            {
 entity.HasKey(e => e.PurchaseDetailID); 
 entity.Property(e => e.ItemTotal).HasComputedColumnSql("([Quantity]*[NetUnitPrice])", false);
 entity.Property(e => e.NetAfterVat).HasComputedColumnSql("([Quantity]*[NetUnitPrice]+[VatAmount])", false);
 entity.Property(e => e.PurchaseDetailID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_Purchases>(entity =>
            {
 entity.HasKey(e => e.PurchaseID); 
 entity.Property(e => e.RemainAmount).HasComputedColumnSql("(round(round((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*isnull([ChargePrc],(0)))/(100),(2))-isnull([PaymentAmount],(0)),(2)))", false);
 entity.Property(e => e.DueAmount).HasComputedColumnSql("(round((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*isnull([ChargePrc],(0)))/(100),(2)))", false);
 entity.Property(e => e.NetAmount).HasComputedColumnSql("(round((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*(0))/(100),(2)))", false);
 entity.Property(e => e.PurchaseID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_SaleDetails>(entity =>
            {
 entity.HasKey(e => e.SaleDetailID); 
 entity.Property(e => e.ItemTotal).HasComputedColumnSql("([Quantity]*[NetUnitPrice])", false);
 entity.Property(e => e.NetAfterVat).HasComputedColumnSql("([Quantity]*[NetUnitPrice]+[VatAmount])", false);
 entity.Property(e => e.SaleDetailID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_Sales>(entity =>
            {
 entity.HasKey(e => e.SaleID); 
 entity.Property(e => e.NetAmount).HasComputedColumnSql("(round(((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+isnull([ExternalAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*(0))/(100),(2)))", false);
 entity.Property(e => e.DueAmount).HasComputedColumnSql("(round(((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+isnull([ExternalAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*isnull([ChargePrc],(0)))/(100),(2)))", false);
 entity.Property(e => e.RemainAmount).HasComputedColumnSql("(round(round(((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))+isnull([ExternalAmount],(0)))+((([ItemsTotal]-isnull([Discount],(0)))+isnull([VatAmount],(0)))*isnull([ChargePrc],(0)))/(100),(2))-isnull([PaymentAmount],(0)),(2)))", false);
 entity.Property(e => e.SaleID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<I_TR_TableReservations>(entity =>
            {
 entity.HasKey(e => e.ReservationID); 
 entity.Property(e => e.ReservationID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_DisplayAllItemsActive>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_DisplayAllItemsUnites>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_EGTaxInvHeader>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_EGTaxInvItems>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_EGTaxReceiptHeader>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_Employees>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_Log_Device>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_RoleModule>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_RoleUsersAllDataComp>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_RoleUsersComp>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_G_TypeEmployeesByUsing>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_GetItemInfo>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_I_Control>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_ItemQtyHanging>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_ItemUnites>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_KSATaxInvHeader>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_KSATaxInvItems>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_FinancialTransactions>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_FinancialTransactionsPateners>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_Link_FinancialTransactions_Inv>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_Link_FinancialTransactions_Pur>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_PurchaseDetails>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_Purchases>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_SaleDetails>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_TR_Sales>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_View_JobOrder>(entity =>
            {
 entity.HasNoKey(); 
 entity.Property(e => e.SaleID).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_View_User_Log>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<IQ_ViewItems>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<PurchaseMasterDetail>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<sysdiagrams>(entity =>
            {
 entity.HasKey(e => e.diagram_id); 
 entity.Property(e => e.diagram_id).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<TempCustomer>(entity =>
            {
 entity.HasNoKey(); 
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<VAT_PERIOD>(entity =>
            {
 entity.HasKey(e => new {
e.COMP_CODE, e.PERIOD_CODE, e.VAT_YEAR });entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<Z_G_Lnk_Build_DetailJournal>(entity =>
            {
 entity.HasKey(e => e.ID_Build); 
 entity.Property(e => e.ID_Build).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<Z_G_Lnk_Create_DirectJournal>(entity =>
            {
 entity.HasKey(e => e.ID_Lnk); 
 entity.Property(e => e.ID_Lnk).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
modelBuilder.Entity<Z_G_Lnk_CreateAccount>(entity =>
            {
 entity.HasKey(e => e.ID_Lnk); 
 entity.Property(e => e.ID_Lnk).ValueGeneratedOnAdd();
entity.Ignore(x => x.StatusFlag);
});
            OnModelCreatingPartial(modelBuilder);
}


 partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
 }
}
