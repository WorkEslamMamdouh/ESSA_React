using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Codes
     {
        public  int?  ID  { get; set; }
        public  string  CodeType  { get; set; }
        public  int?  CodeValue  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  SubCode  { get; set; }
        public  string  Remarks  { get; set; }
        public  string  StdCode  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
