using Core.UI.Repository;
using Core.UI.Repository.Models;

namespace Core.UI.Models
{
    public class Table
    {
        public string NameTable { get; set; } = "";
        public string Condition { get; set; } = "";
        public bool? IsProc { get; set; } = false;
        public bool? IsExec { get; set; } = false;
        public bool? IsPage { get; set; } = false;
        public int? PageNumber { get; set; } = 0;
        public int? PageSize { get; set; } = 0;
        public string? OrderByID { get; set; } = "";
        public string? SearchValue { get; set; } = "";
         
    }
}
