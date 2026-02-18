using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_I_ContainerDataExcel
     {
        public  int?  IDContExcel  { get; set; }
        public  int?  NumLoop_Batch  { get; set; }
        public  int?  CreateByUserID  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  int?  IDTypeTemp  { get; set; }
        public  int?  RowNumber  { get; set; }
        public  string  NameTitle  { get; set; }
        public  int?  IDTempExcel  { get; set; }
        public  int?  IDFeildExcel  { get; set; }
        public  string  ValueFelid  { get; set; }
        public  int?  Status  { get; set; }
        public  string  ErrorMessage  { get; set; }
        public  string  QueryRow  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
