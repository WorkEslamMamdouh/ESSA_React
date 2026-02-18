using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class E_G_Link_BuildFeildExcelTable
     {
        public  int?  IDFeildExcel  { get; set; }
        public  int?  IDLnkExcel  { get; set; }
        public  int?  Serial  { get; set; }
        public  string  ColumnKey  { get; set; }
        public  string  DescA  { get; set; }
        public  string  DescE  { get; set; }
        public  string  NameFelid  { get; set; }
        public  string  TypeFelid  { get; set; }
        public  string  DefaultValueFelid  { get; set; }
        public  bool?  IsInsertNewRowValue  { get; set; }
        public  bool?  IsInsertTable  { get; set; }
        public  bool?  IsShow  { get; set; }
        public  bool?  IsOutFelidTable  { get; set; }
        public  string  NameFelidForeignKeyInTable_Lnk_1  { get; set; }
        public  string  NameFelidForeignKeyInTable_Lnk_2  { get; set; }
        public  string  NameOutTableGetData  { get; set; }
        public  string  NamePrimaryKeyOutTable_1  { get; set; }
        public  string  NamePrimaryKeyOutTable_2  { get; set; }
        public  string  NameFelidSelectValue  { get; set; }
        public  int?  LinkCodeGroupUsing  { get; set; }
        public  bool?  IsLinkFelidinTable  { get; set; }
        public  int?  LinkCodeGroupUsing_Parent  { get; set; }
        public  bool?  IsActive  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
