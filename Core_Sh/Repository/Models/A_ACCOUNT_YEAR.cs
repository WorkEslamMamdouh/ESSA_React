using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class A_ACCOUNT_YEAR
     {
        public  int?  COMP_CODE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  int?  FIN_YEAR  { get; set; }
        public  decimal?  ACC_LIMIT  { get; set; }
        public  string  REMARKS  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
