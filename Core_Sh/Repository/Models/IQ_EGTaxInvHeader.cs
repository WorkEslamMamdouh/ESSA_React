using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_EGTaxInvHeader
     {
        public  int?  sub_Bra_code  { get; set; }
        public  string  sub_Bra_Name  { get; set; }
        public  string  Sub_Country  { get; set; }
        public  string  sub_governate  { get; set; }
        public  string  Sub_City  { get; set; }
        public  string  Sub_Street  { get; set; }
        public  string  sub_BuildingNo  { get; set; }
        public  string  sub_PostalCode  { get; set; }
        public  string  sub_Floor  { get; set; }
        public  string  sub__Room  { get; set; }
        public  string  sub_LandMarks  { get; set; }
        public  string  sub_AdditionalInfo  { get; set; }
        public  string  sub_Type  { get; set; }
        public  string  sub_VatNo  { get; set; }
        public  string  sub_Name  { get; set; }
        public  string  Cus_Country  { get; set; }
        public  string  Cus_governate  { get; set; }
        public  string  Cus_City  { get; set; }
        public  string  Cus_Street  { get; set; }
        public  string  Cus_BuildingNo  { get; set; }
        public  string  Cus_PostalCode  { get; set; }
        public  string  Cus_Floor  { get; set; }
        public  string  Cus__Room  { get; set; }
        public  string  Cus_LandMarks  { get; set; }
        public  string  Cus_AdditionalInfo  { get; set; }
        public  string  Cus_VatNo  { get; set; }
        public  string  Cus_Name  { get; set; }
        public  string  Cus_Type  { get; set; }
        public  string  Sub_ActivityCode  { get; set; }
        public  decimal?  AllowAfterVat  { get; set; }
        public  decimal?  DiscountAmount  { get; set; }
        public  string  PurchaseorderNo  { get; set; }
        public  string  purchaseorderDesc  { get; set; }
        public  int?  SalesOrderRef  { get; set; }
        public  string  SalesORderDesc  { get; set; }
        public  string  perofrmainvoiceno  { get; set; }
        public  decimal?  ItemDiscountTotal  { get; set; }
        public  decimal?  ItemTotal  { get; set; }
        public  decimal?  hd_NetAmount  { get; set; }
        public  decimal?  hd_TaxTotal  { get; set; }
        public  decimal?  hd_TotalAmount  { get; set; }
        public  decimal?  RoundingAmount  { get; set; }
        public  int?  InvoiceID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  string  inv_Type  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  TimeSpan?  TrTime  { get; set; }
        public  DateTime?  TaxUploadDate  { get; set; }
        public  string  DocUUID  { get; set; }
        public  int?  BranchCode  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  Status  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  TaxType  { get; set; }
        public  string  TaxCode  { get; set; }
        public  decimal?  TaxPrc  { get; set; }
        public  decimal?  DedTaxAmount  { get; set; }
        public  string  DedTaxType  { get; set; }
        public  decimal?  CurrencyRate  { get; set; }
        public  string  CurrencyCode  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
