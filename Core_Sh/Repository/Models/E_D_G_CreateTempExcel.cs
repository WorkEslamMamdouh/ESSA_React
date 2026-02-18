using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_D_G_CreateTempExcel
     {
        public  int?  IDTempExcel  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  IDTypeTemp  { get; set; }
        public  int?  Serial  { get; set; }
        public  string  NameTitle  { get; set; }
        public  string  Remark  { get; set; }
        public  int?  IDLnkExcel  { get; set; }
        public  int?  IDFeildExcel  { get; set; }
        public  string  CustomFeild  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
