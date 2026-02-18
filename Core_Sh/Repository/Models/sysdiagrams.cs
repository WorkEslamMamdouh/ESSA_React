using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class sysdiagrams
     {
        public  string  name  { get; set; }
        public  int?  principal_id  { get; set; }
        public  int?  diagram_id  { get; set; }
        public  int?  version  { get; set; }
        public  string  definition  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
