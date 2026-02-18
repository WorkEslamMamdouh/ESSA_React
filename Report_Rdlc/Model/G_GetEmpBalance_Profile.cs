using System;
 
 namespace Report_Rdlc
 {
      public partial class G_GetEmpBalance_Profile
     {
        public  int  Ser  { get; set; }
        public  int?  EmpID  { get; set; }
        public  string  DescAcc  { get; set; }
        public  string  Acc_Code  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  decimal?  Balance  { get; set; }

     }

 }
