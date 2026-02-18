using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_G_Link_CreateExcelByTable
     {
        public  int?  IDLnkExcel  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  Ser  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  int?  IsWorkInsertAllFelidsInRow  { get; set; }
        public  string  NameA  { get; set; }
        public  string  NameE  { get; set; }
        public  string  NameTable  { get; set; }
        public  string  NameRunProc  { get; set; }
        public  string  NameFelidID  { get; set; }
        public  string  NameFelidTrNo  { get; set; }
        public  string  NameFelidExcelID  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
