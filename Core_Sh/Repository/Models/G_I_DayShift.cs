using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_I_DayShift
     {
        public  int?  DayShiftID  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  int?  Status  { get; set; }
        public  string  Remark  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  LastCount  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
