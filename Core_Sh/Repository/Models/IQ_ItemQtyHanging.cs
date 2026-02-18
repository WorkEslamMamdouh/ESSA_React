using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_ItemQtyHanging
     {
        public  int?  ItemID  { get; set; }
        public  int?  TransID  { get; set; }
        public  decimal?  HangingQty  { get; set; }
        public  int?  compcode  { get; set; }
        public  int?  TrType  { get; set; }
        public  int?  TrNo  { get; set; }
        public  DateTime?  SaleDate  { get; set; }
        public  string  Type  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
