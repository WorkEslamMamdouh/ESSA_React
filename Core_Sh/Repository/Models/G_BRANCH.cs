using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_BRANCH
     {
        public  int?  COMP_CODE  { get; set; }
        public  int?  BRA_CODE  { get; set; }
        public  string  BRA_DESC  { get; set; }
        public  byte?  BRA_TYPE  { get; set; }
        public  string  BRA_DESCL  { get; set; }
        public  string  BRA_SHORTA  { get; set; }
        public  string  BRA_SHORTL  { get; set; }
        public  string  REGION_CODE  { get; set; }
        public  string  City  { get; set; }
        public  string  Address  { get; set; }
        public  string  Tel  { get; set; }
        public  string  Fax  { get; set; }
        public  string  Email  { get; set; }
        public  string  WebSite  { get; set; }
        public  string  BranchManager  { get; set; }
        public  string  HRResponsible  { get; set; }
        public  string  FinanceResponsible  { get; set; }
        public  string  SalesManager  { get; set; }
        public  string  CUSTOM1  { get; set; }
        public  string  CUSTOM2  { get; set; }
        public  string  CUSTOM3  { get; set; }
        public  string  CUSTOM4  { get; set; }
        public  string  CUSTOM5  { get; set; }
        public  bool?  CUSTOMFLAG1  { get; set; }
        public  bool?  CUSTOMFLAG2  { get; set; }
        public  decimal?  CUSTOMNUM1  { get; set; }
        public  decimal?  CUSTOMNUM2  { get; set; }
        public  DateTime?  CUSTOMDATE  { get; set; }
        public  string  BRA_DESCE  { get; set; }
        public  string  GroupVatNo  { get; set; }
        public  int?  VndIDTypeCode  { get; set; }
        public  string  IDNo  { get; set; }
        public  string  Address_Street  { get; set; }
        public  string  Address_Str_Additional  { get; set; }
        public  string  Address_BuildingNo  { get; set; }
        public  string  Address_Build_Additional  { get; set; }
        public  string  Address_City  { get; set; }
        public  string  Address_Postal  { get; set; }
        public  string  Address_Province  { get; set; }
        public  string  Address_District  { get; set; }
        public  int?  NationalityID  { get; set; }
        public  int?  Currencyid  { get; set; }
        public  int?  RetailInvoiceAllowed  { get; set; }
        public  int?  RetailInvoiceTransCode  { get; set; }
        public  int?  RetailInvoicePayment  { get; set; }
        public  int?  WholeInvoiceTransCode  { get; set; }
        public  int?  WholeInvoiceAllowed  { get; set; }
        public  int?  WholeInvoicePayment  { get; set; }
        public  bool?  AutoupdateSalesPrice  { get; set; }
        public  decimal?  SalePriceAddPerc  { get; set; }
        public  decimal?  SalePriceMinAddPerc  { get; set; }
        public  string  ExceedMinPricePassword  { get; set; }
        public  int?  RetailInvoicePaymentDef  { get; set; }
        public  int?  OperationInvoicePaymentDef  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
