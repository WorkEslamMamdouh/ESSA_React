using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class CheckTransactionsUnPosted
     {
        public  string  Description  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  int?  COMP_CODE  { get; set; }
        public  int?  FinYear  { get; set; }
        public  int?  TransID  { get; set; }
        public  int?  TrNo  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  decimal?  Amount  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
