using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class ES_GetAllInformationBalByUser
     {
        public  int  IDTrans  { get; set; }
        public  long?  USERID  { get; set; }
        public  string  USER_NAME  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  string  DescA  { get; set; }
        public  string  Symbols  { get; set; }
        public  string  Remark  { get; set; }
        public  decimal?  Amount  { get; set; }

     }

 }
