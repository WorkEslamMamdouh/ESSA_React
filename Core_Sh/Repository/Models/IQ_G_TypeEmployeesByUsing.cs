using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_G_TypeEmployeesByUsing
     {
        public  int?  CompCode  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  int?  EmpType  { get; set; }
        public  int?  IDTypeEmp  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  Remark  { get; set; }
        public  int?  EmpID  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
