using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class G_Check_DataChangesForSearchForm
     {
        public  string  SearchFormCode  { get; set; }
        public  string  ReturnDataPropertyName  { get; set; }
        public  string  Description  { get; set; }
        public  string  SerachFormTitle  { get; set; }
        public  bool  IsFullScreen  { get; set; }
        public  int  Left  { get; set; }
        public  int  Top  { get; set; }
        public  int  Height  { get; set; }
        public  int  Width  { get; set; }
        public  int  PageSize  { get; set; }
        public  string  DataSourceName  { get; set; }
        public  int  SearchInterval  { get; set; }
        public  string  SerachFormTitleA  { get; set; }
        public  bool?  ISActive  { get; set; }
        public  string  KeyTrigger  { get; set; }
        public  int?  Status  { get; set; }
        public  string  NameFolder  { get; set; }

     }

 }
