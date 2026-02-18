using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Run_Trigger
     {
        public  int?  Id  { get; set; }
        public  int?  ComCode  { get; set; }
        public  int?  FinYear  { get; set; }
        public  int?  Status_Trigger  { get; set; }
        public  DateTime?  Date  { get; set; }
        public  string  TrType  { get; set; }
        public  string  Remark  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
