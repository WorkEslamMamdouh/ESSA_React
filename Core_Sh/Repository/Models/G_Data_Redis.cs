using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Data_Redis
     {
        public  int?  Id  { get; set; }
        public  string  NameTable  { get; set; }
        public  int?  TrType  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  KeyTrigger  { get; set; }
        public  int?  Status  { get; set; }
        public  string  NameFolder  { get; set; }
        public  string  IDServerDevice  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
