using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_SearchFormModule
     {
        public  string  SystemCode  { get; set; }
        public  string  SubSystemCode  { get; set; }
        public  string  ModuleCode  { get; set; }
        public  string  ControlCode  { get; set; }
        public  string  SearchFormCode  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
