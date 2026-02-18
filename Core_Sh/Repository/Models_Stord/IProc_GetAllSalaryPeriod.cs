using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class IProc_GetAllSalaryPeriod
     {
        public  long?  RowNumber  { get; set; }
        public  DateTime?  DateClosed  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  string  Remarks  { get; set; }
        public  long?  IDPeriod  { get; set; }
        public  decimal?  Balances  { get; set; }

     }

 }
