using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_I_Control
     {
        public  int?  CompCode  { get; set; }
        public  string  Comp_ACC_CODE  { get; set; }
        public  string  ACC_CODE_Create_User  { get; set; }
        public  string  StartAccCode_User  { get; set; }
        public  int?  DefSlsVatType  { get; set; }
        public  int?  DefPurVatType  { get; set; }
        public  bool?  IsVat  { get; set; }
        public  int?  MobileLength  { get; set; }
        public  int?  IDLength  { get; set; }
        public  bool?  SendSMS  { get; set; }
        public  bool?  SendPublicSMS  { get; set; }
        public  int?  NotePeriodinSec  { get; set; }
        public  int?  DashBoardPeriodinSec  { get; set; }
        public  int?  MaxYearlyMSGs  { get; set; }
        public  int?  UsedMSGs  { get; set; }
        public  int?  UserTimeZoneUTCDiff  { get; set; }
        public  int?  ServerTimeZoneUTCDiff  { get; set; }
        public  int?  SaudiNationID  { get; set; }
        public  bool?  WebCustomerWebsite  { get; set; }
        public  DateTime?  MembeshiptStartDate  { get; set; }
        public  DateTime?  MembeshipEndDate  { get; set; }
        public  int?  MembershipAllanceDays  { get; set; }
        public  int?  MembershipreadOnlyDays  { get; set; }
        public  bool?  IsFreePurchaseReturn  { get; set; }
        public  bool?  IsFreeSalesReturn  { get; set; }
        public  string  ExceedMinPricePassword  { get; set; }
        public  string  CurNameA  { get; set; }
        public  string  CurNameE  { get; set; }
        public  string  CurSmallNameA  { get; set; }
        public  string  CurSmallNameE  { get; set; }
        public  bool?  IsLocalBranchCustomer  { get; set; }
        public  int?  SysTimeOut  { get; set; }
        public  int?  NationalityID  { get; set; }
        public  int?  Currencyid  { get; set; }
        public  string  DocPDFFolder  { get; set; }
        public  string  TemplateExcelFolder  { get; set; }
        public  string  Start_Loan_Custody  { get; set; }
        public  string  ACC_CODE_Custody  { get; set; }
        public  string  ACC_CODE_Loan  { get; set; }
        public  string  EGTax_ClientIDProd  { get; set; }
        public  string  EGTax_SecretIDProd  { get; set; }
        public  bool?  TaxLinkedEG  { get; set; }
        public  bool?  TaxLinked  { get; set; }
        public  int?  TaxUnitID  { get; set; }
        public  bool?  IS_POS  { get; set; }
        public  bool?  Is_Restaurant  { get; set; }
        public  int?  ISWork_Type_Items  { get; set; }
        public  bool?  Is_ShowPrice  { get; set; }
        public  bool?  Is_JobOrder  { get; set; }
        public  bool?  Is_CarCenter  { get; set; }
        public  int?  TechRepType  { get; set; }
        public  int?  Quickly_INV  { get; set; }
        public  bool?  AutoCode  { get; set; }
        public  string  previousUUID  { get; set; }
        public  string  StatusRemark  { get; set; }
        public  int?  StatusOpen  { get; set; }
        public  bool?  IsArchive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
