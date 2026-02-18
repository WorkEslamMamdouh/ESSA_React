using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_View_JobOrder
     {
        public  int?  SaleID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  int?  TrType  { get; set; }
        public  int?  GlobalNo  { get; set; }
        public  string  DoNo  { get; set; }
        public  int?  RefID  { get; set; }
        public  string  ReNo  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  int?  CashType  { get; set; }
        public  DateTime?  SaleDate  { get; set; }
        public  int?  CompCode  { get; set; }
        public  TimeSpan?  TrTime  { get; set; }
        public  int?  Status  { get; set; }
        public  string  CustomerName  { get; set; }
        public  string  Mobile  { get; set; }
        public  int?  SalesManID  { get; set; }
        public  string  SalesManName  { get; set; }
        public  string  SalesManMobile  { get; set; }
        public  string  AttatchName  { get; set; }
        public  decimal?  ItemsTotal  { get; set; }
        public  decimal?  Discount  { get; set; }
        public  decimal?  TotalAmount  { get; set; }
        public  int?  VatTypeID  { get; set; }
        public  decimal?  VatAmount  { get; set; }
        public  decimal?  ChargePrc  { get; set; }
        public  decimal?  NetAmount  { get; set; }
        public  decimal?  DueAmount  { get; set; }
        public  decimal?  RemainAmount  { get; set; }
        public  decimal?  PaymentAmount  { get; set; }
        public  bool?  IsService  { get; set; }
        public  int?  CustomerID  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  VoucherNo  { get; set; }
        public  bool?  IsPosted  { get; set; }
        public  string  QRCode  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  int?  InvoiceTransCode  { get; set; }
        public  int?  TaxStatus  { get; set; }
        public  string  DocUUID  { get; set; }
        public  string  PrevInvoiceHash  { get; set; }
        public  string  IDPeriod  { get; set; }
        public  string  PaymentTerms  { get; set; }
        public  string  PaymentType  { get; set; }
        public  string  ExpiryTime  { get; set; }
        public  string  DeliveryTime  { get; set; }
        public  int?  TaxErrorCode  { get; set; }
        public  int?  ShowPriceID  { get; set; }
        public  string  ShowPriceNo  { get; set; }
        public  int?  JobOrderID  { get; set; }
        public  string  JobOrderNo  { get; set; }
        public  string  Warrantyperiod  { get; set; }
        public  string  CarBrand  { get; set; }
        public  string  CarNo  { get; set; }
        public  string  DestructionKm  { get; set; }
        public  string  EngineerName  { get; set; }
        public  string  ChassisNo  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
