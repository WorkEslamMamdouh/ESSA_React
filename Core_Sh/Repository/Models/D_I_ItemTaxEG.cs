using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class D_I_ItemTaxEG
     {
        public  int?  ItemTaxID  { get; set; }
        public  int?  CatID  { get; set; }
        public  int?  COMP_CODE  { get; set; }
        public  int?  Status  { get; set; }
        public  string  codeType  { get; set; }
        public  string  parentCode  { get; set; }
        public  string  itemCode  { get; set; }
        public  string  codeName  { get; set; }
        public  string  codeNameAr  { get; set; }
        public  DateTime?  activeFrom  { get; set; }
        public  DateTime?  activeTo  { get; set; }
        public  string  description  { get; set; }
        public  string  Remarks  { get; set; }
        public  DateTime?  UploadDate  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
