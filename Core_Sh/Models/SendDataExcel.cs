 
using Core.UI.Repository;
using Core.UI.Repository.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.UI.Models
{
    public class SendDataExcel
    {
        public E_I_LogUploadExcel E_I_LogUploadExcel { get; set; }
        public List<object> DataTemp { get; set; }
        public bool IsPostDirectJournal { get; set; }
        public int FamilyZoneID { get; set; }
        public int ZoneId { get; set; }
        public int? SupervisorID { get; set; }



    }
}
