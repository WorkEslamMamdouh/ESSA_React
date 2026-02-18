using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_SearchFormSetting
     {
        public  int?  SearchFormSettingID  { get; set; }
        public  string  SearchFormCode  { get; set; }
        public  byte?  FieldSequence  { get; set; }
        public  string  DataMember  { get; set; }
        public  string  AlternateDataMember  { get; set; }
        public  string  FieldTitle  { get; set; }
        public  bool?  IsReadOnly  { get; set; }
        public  byte?  Datatype  { get; set; }
        public  int?  FieldWidth  { get; set; }
        public  bool?  UseSelectionOperator  { get; set; }
        public  byte?  Language  { get; set; }
        public  string  FieldTitleA  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
