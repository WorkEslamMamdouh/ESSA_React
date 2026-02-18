using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_GetAllPeriodSalaryByUser
     {
        public  long?  RowNumber  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int  IDTrans  { get; set; }
        public  DateTime?  TrDate  { get; set; }
        public  string  Name_User  { get; set; }
        public  decimal?  Salary  { get; set; }
        public  long?  USERID  { get; set; }
        public  int  UsID  { get; set; }
        public  int?  CountUSERID  { get; set; }

     }

 }
