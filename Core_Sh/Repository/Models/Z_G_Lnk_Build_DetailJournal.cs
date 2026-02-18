using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class Z_G_Lnk_Build_DetailJournal
     {
        public  int?  ID_Build  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  KeyTrans  { get; set; }
        public  string  DescA_FelidLnk  { get; set; }
        public  bool?  IsOutFelidTable  { get; set; }
        public  string  NameFelidForeignKeyInTable_Lnk  { get; set; }
        public  string  NameOutTableGetData  { get; set; }
        public  string  NamePrimaryKeyOutTable  { get; set; }
        public  string  NameFelidAcc  { get; set; }
        public  string  NameFelidAmount_InTableLnk  { get; set; }
        public  bool?  IsCredit  { get; set; }
        public  string  NameFelidRemarks  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
