using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_COMPANY
     {
        public  int?  COMP_CODE  { get; set; }
        public  string  NameA  { get; set; }
        public  string  NameE  { get; set; }
        public  string  Systems  { get; set; }
        public  string  MOI_ID  { get; set; }
        public  string  CRT_NO  { get; set; }
        public  string  City  { get; set; }
        public  string  Address  { get; set; }
        public  string  Tel  { get; set; }
        public  string  Fax  { get; set; }
        public  string  Email  { get; set; }
        public  string  WebSite  { get; set; }
        public  string  GMName  { get; set; }
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
        public  bool?  IsActive  { get; set; }
        public  bool?  IsReadOnly  { get; set; }
        public  string  LogoIcon  { get; set; }
        public  string  BkImage1  { get; set; }
        public  string  BkImage2  { get; set; }
        public  string  IBAN_NO  { get; set; }
        public  string  BanckAccNo  { get; set; }
        public  string  BanckAccName  { get; set; }
        public  string  GroupVatNo  { get; set; }
        public  string  VATNO  { get; set; }
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
        public  string  Address_Floor  { get; set; }
        public  string  Address_Room  { get; set; }
        public  string  Address_LandMarks  { get; set; }
        public  int?  NationalityID  { get; set; }
        public  int?  Currencyid  { get; set; }
        public  string  TaxBusinessType  { get; set; }
        public  string  TaxActivityCode  { get; set; }
        public  string  TaxUserCode  { get; set; }
        public  string  TaxUserverification  { get; set; }
        public  string  TaxToken  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
