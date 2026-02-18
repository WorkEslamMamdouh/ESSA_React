using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_A_Suppliers
     {
        public  int?  SupplierID  { get; set; }
        public  string  SuppliersCode  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  SupplierName  { get; set; }
        public  string  AccountNo  { get; set; }
        public  bool?  IsCash  { get; set; }
        public  string  Mobile  { get; set; }
        public  decimal?  Debit  { get; set; }
        public  decimal?  Credit  { get; set; }
        public  decimal?  Balance  { get; set; }
        public  decimal?  PreviousDebit  { get; set; }
        public  decimal?  PreviousCredit  { get; set; }
        public  DateTime?  OpenBalanceAt  { get; set; }
        public  string  Info  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
