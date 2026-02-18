using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class G_SearchForm
     {
        public  string  SearchFormCode  { get; set; }
        public  string  ReturnDataPropertyName  { get; set; }
        public  string  Description  { get; set; }
        public  string  SerachFormTitle  { get; set; }
        public  bool?  IsFullScreen  { get; set; }
        public  int?  Left  { get; set; }
        public  int?  Top  { get; set; }
        public  int?  Height  { get; set; }
        public  int?  Width  { get; set; }
        public  int?  PageSize  { get; set; }
        public  string  DataSourceName  { get; set; }
        public  int?  SearchInterval  { get; set; }
        public  string  SerachFormTitleA  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  KeyTrigger  { get; set; }
        public  int?  Status  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
