using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class IQ_G_Employees
     {
        public  int?  EmpID  { get; set; }
        public  int?  EmpType  { get; set; }
        public  string  EmpCode  { get; set; }
        public  int?  CompCode  { get; set; }
        public  string  Emp_Name  { get; set; }
        public  int?  Status  { get; set; }
        public  string  Address  { get; set; }
        public  string  Mobile  { get; set; }
        public  string  Mobile2  { get; set; }
        public  string  Email  { get; set; }
        public  string  ManagedBy  { get; set; }
        public  bool?  LoginUrl  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  ManagerID  { get; set; }
        public  int?  SupervisorID  { get; set; }
        public  int?  FamilyZoneID  { get; set; }
        public  int?  ZoneID  { get; set; }
        public  string  Job_Title  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  string  Profile_Img  { get; set; }
        public  string  FrontID_Img  { get; set; }
        public  string  BackID_Img  { get; set; }
        public  int?  Gender  { get; set; }
        public  string  IDNO  { get; set; }
        public  string  FrontDrivLicense_Img  { get; set; }
        public  string  BackDrivLicense_Img  { get; set; }
        public  string  FrontVicLicense_Img  { get; set; }
        public  string  BackVicLicense_Img  { get; set; }
        public  string  AccTransferNo  { get; set; }
        public  string  AccNameTransfer  { get; set; }
        public  string  Custody_Code  { get; set; }
        public  string  Loan_Code  { get; set; }
        public  decimal?  CustodyAmount  { get; set; }
        public  decimal?  LoanAmount  { get; set; }
        public  decimal?  SalaryAmount  { get; set; }
        public  int?  IDExcel  { get; set; }
        public  string  NameFamliyZone  { get; set; }
        public  string  NameZone  { get; set; }
        public  string  USER_CODE  { get; set; }
        public  int?  ID  { get; set; }
        public  string  USER_PASSWORD  { get; set; }
        public  string  DescEmpType  { get; set; }
        public  bool?  IsUser  { get; set; }
        public  int?  EmpRole  { get; set; }
        public  string  PayLoan_Cust_Code  { get; set; }
        public  string  ACC_CODE  { get; set; }
        public  string  Password_Login  { get; set; }
        public  string  User_Login  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
