using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
 namespace Core.UI.Repository.Models
 {
      public partial class I_TR_TableReservations
     {
        public  int?  ReservationID  { get; set; }
        public  int?  TableID  { get; set; }
        public  DateTime?  ReservationDate  { get; set; }
        public  TimeSpan?  ReservationTime  { get; set; }
        public  string  CustomerName  { get; set; }
        public  int?  NumberOfPeople  { get; set; }
        public  int?  Status  { get; set; }
        public  string  Remarks  { get; set; }
        public  int?  IDUserCreate  { get; set; }
        public  DateTime?  CreatedAt  { get; set; }
        public  string  CreatedBy  { get; set; }
        public  DateTime?  UpdatedAt  { get; set; }
        public  string  UpdatedBy  { get; set; }
        public  int?  CompCode  { get; set; }
        public  int?  IDExcel  { get; set; }

  [NotMapped]
public char? StatusFlag { get; set; }
     }

 }
