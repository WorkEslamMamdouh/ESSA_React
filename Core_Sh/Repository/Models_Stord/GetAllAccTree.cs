using System;
 
 namespace Core.UI.Repository.Models
 {
      public partial class GetAllAccTree
     {
        public  int  COMP_CODE  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  ACC_DESCA  { get; set; }
        public  string  ACC_DESCL  { get; set; }
        public  int?  ACC_GROUP  { get; set; }
        public  int?  ACC_TYPE  { get; set; }
        public  int?  ACC_LEVEL  { get; set; }
        public  bool?  ACC_ACTIVE  { get; set; }
        public  string  PARENT_ACC  { get; set; }
        public  bool?  DETAIL  { get; set; }
        public  string  CREATED_BY  { get; set; }
        public  DateTime?  CREATED_AT  { get; set; }
        public  string  UPDATED_BY  { get; set; }
        public  DateTime?  LAST_UPDATE  { get; set; }
        public  string  CCDT_TYPE  { get; set; }
        public  string  CUR_CODE  { get; set; }
        public  decimal?  FinancialAmount  { get; set; }
        public  decimal?  FinancialDistAmount  { get; set; }
        public  decimal?  FinancialCollectAmount  { get; set; }
        public  decimal?  FinancialRemCollectAmount  { get; set; }
        public  decimal  FinancialPayAmount  { get; set; }
        public  decimal?  FinancialPaidAmount  { get; set; }
        public  decimal?  FinancialRemainAmount  { get; set; }
        public  decimal?  FinancialLastRemain  { get; set; }
        public  decimal?  CustodyDebit  { get; set; }
        public  decimal?  CustodyCredit  { get; set; }
        public  decimal?  CustodyRemain  { get; set; }
        public  decimal?  LoanDebit  { get; set; }
        public  decimal?  LoanCredit  { get; set; }
        public  decimal?  LoanRemain  { get; set; }
        public  int  FIN_YEAR  { get; set; }
        public  decimal?  OpenDebit  { get; set; }
        public  decimal?  OpenCredit  { get; set; }
        public  decimal?  OPENING_BALANCE  { get; set; }
        public  decimal?  CREDIT  { get; set; }
        public  decimal?  DEBIT  { get; set; }
        public  decimal?  ACC_LIMIT  { get; set; }
        public  string  REMARKS  { get; set; }

     }

 }
