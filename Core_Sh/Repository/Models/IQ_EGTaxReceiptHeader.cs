using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_EGTaxReceiptHeader
     {
        public  int?  SellerBranchCode  { get; set; }
        public  string  orderdeliveryMode  { get; set; }
        public  string  sub_Bra_Name  { get; set; }
        public  string  SellerCountry  { get; set; }
        public  string  SellerGovernate  { get; set; }
        public  string  SellerRegionCity  { get; set; }
        public  string  SellerStreet  { get; set; }
        public  string  SellerBuildingNumber  { get; set; }
        public  string  SellerPostalCode  { get; set; }
        public  string  SellerFloor  { get; set; }
        public  string  SellerRoom  { get; set; }
        public  string  SellerLandmark  { get; set; }
        public  string  SellerAdditionalInformation  { get; set; }
        public  string  sub_Type  { get; set; }
        public  string  SellerRin  { get; set; }
        public  string  SellerCompanyTradeName  { get; set; }
        public  string  BuyerId  { get; set; }
        public  string  BuyerName  { get; set; }
        public  string  BuyerMobileNumber  { get; set; }
        public  string  paymentMethod  { get; set; }
        public  string  BuyerPaymentNumber  { get; set; }
        public  string  BuyerType  { get; set; }
        public  string  activityCode  { get; set; }
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
        public  int?  ReceiptNumber  { get; set; }
        public  string  inv_Type  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  TimeSpan?  TrTime  { get; set; }
        public  DateTime?  TaxUploadDate  { get; set; }
        public  string  DocUUID  { get; set; }
        public  int?  BranchCode  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  Status  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  typeVersion  { get; set; }
        public  string  receiptType  { get; set; }
        public  decimal?  feesAmount  { get; set; }
        public  string  TaxCode  { get; set; }
        public  decimal?  TaxPrc  { get; set; }
        public  decimal?  DedTaxAmount  { get; set; }
        public  string  DedTaxType  { get; set; }
        public  decimal?  CurrencyRate  { get; set; }
        public  string  currency  { get; set; }
        public  string  uuid  { get; set; }
        public  string  previousUUID  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
