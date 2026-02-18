using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_I_LogUploadExcel
     {
        public  int?  IDExcel  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  IDLnkExcel  { get; set; }
        public  int?  IDTypeTemp  { get; set; }
        public  string  From_ACC_CODE  { get; set; }
        public  string  NameExcel  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  int?  TrType  { get; set; }
        public  int?  Status  { get; set; }
        public  string  Remark  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  string  DescError  { get; set; }
        public  bool?  IsPostDirectJournal  { get; set; }
        public  int?  LastCountLoop  { get; set; }
        public  string  ErrorMessage  { get; set; }
        public  int?  CreateByUserID  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
