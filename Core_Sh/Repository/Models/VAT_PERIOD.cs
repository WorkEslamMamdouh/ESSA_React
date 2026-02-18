using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class VAT_PERIOD
     {
        public  int?  COMP_CODE  { get; set; }
        public  int?  VAT_YEAR  { get; set; }
        public  int?  PERIOD_CODE  { get; set; }
        public  DateTime?  FROM_DATE  { get; set; }
        public  DateTime?  TO_DATE  { get; set; }
        public  byte?  STATUS  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
