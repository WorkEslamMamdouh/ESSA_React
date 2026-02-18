using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_Tr_Archive
     {
        public  int?  ArchiveID  { get; set; }
        public  string  RefNo  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  FinYear  { get; set; }
        public  string  MODULE_CODE  { get; set; }
        public  int?  TransID  { get; set; }
        public  string  UUID  { get; set; }
        public  string  NameFile  { get; set; }
        public  string  TypeFile  { get; set; }
        public  string  Remarks  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  int?  Status  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
