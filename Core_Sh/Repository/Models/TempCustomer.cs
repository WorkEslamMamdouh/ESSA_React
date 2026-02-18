using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class TempCustomer
     {
        public  int?  CustomerId  { get; set; }
        public  string  CustomerCODE  { get; set; }
        public  string  NAMEA  { get; set; }
        public  string  NAMEE  { get; set; }
        public  string  EMAIL  { get; set; }
        public  string  REMARKS  { get; set; }
        public  string  MOBILE  { get; set; }
        public  string  MOBILE2  { get; set; }
        public  string  AccountNo  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  CREATED_BY  { get; set; }
        public  DateTime?  CREATED_AT  { get; set; }
        public  DateTime?  UPDATED_AT  { get; set; }
        public  string  UPDATED_BY  { get; set; }
        public  int?  VATType  { get; set; }
        public  string  VatNo  { get; set; }
        public  bool?  Isactive  { get; set; }
        public  decimal?  CreditLimit  { get; set; }
        public  int?  CreditPeriod  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  decimal?  PreviousDebit  { get; set; }
        public  decimal?  PreviousCredit  { get; set; }
        public  decimal?  Openbalance  { get; set; }
        public  byte?  PaymentType  { get; set; }
        public  bool?  IsCreditCustomer  { get; set; }
        public  string  Address_postal  { get; set; }
        public  string  Address_Province  { get; set; }
        public  string  GroupVatNo  { get; set; }
        public  string  Address_Street  { get; set; }
        public  string  Address_Str_Additional  { get; set; }
        public  string  Address_BuildingNo  { get; set; }
        public  string  Address_Build_Additional  { get; set; }
        public  string  Address_City  { get; set; }
        public  string  Address_District  { get; set; }
        public  string  Address_Floor  { get; set; }
        public  string  Address_Room  { get; set; }
        public  string  Address_LandMarks  { get; set; }
        public  int?  SalesInvoiceNature  { get; set; }
        public  bool?  ISPersonal  { get; set; }
        public  DateTime?  OpenbalanceAt  { get; set; }
        public  string  CarBrand  { get; set; }
        public  string  CarNo  { get; set; }
        public  string  DestructionKm  { get; set; }
        public  string  DrivingNum  { get; set; }
        public  int?  NationalityID  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
