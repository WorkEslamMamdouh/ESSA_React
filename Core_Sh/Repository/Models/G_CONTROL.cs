using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_CONTROL
     {
        public  int?  COMP_CODE  { get; set; }
        public  int?  FIN_YEAR  { get; set; }
        public  DateTime?  FirstDate  { get; set; }
        public  DateTime?  LastDate  { get; set; }
        public  int?  Status  { get; set; }
        public  bool?  IsOpen  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
