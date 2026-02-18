 
using Core.UI.Repository;
using Core.UI.Repository.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.UI.Models
{ 

   public class ModeSearch
    {
        public string TableName { get; set; }
        public string Condition { get; set; }
        public List<object> DataResult { get; set; }
        public Settings Settings { get; set; }
        public List<Column> Columns { get; set; }
    }

 

    public class Settings
    {
        public string SearchFormCode { get; set; }
        public string ReturnDataPropertyName { get; set; }
        public string Description { get; set; }
        public string SerachFormTitle { get; set; }
        public bool IsFullScreen { get; set; }
        public int Left { get; set; }
        public int Top { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int PageSize { get; set; }
        public string DataSourceName { get; set; }
        public int SearchInterval { get; set; }
        public string SerachFormTitleA { get; set; }
        public object StatusFlag { get; set; }
    }
     

    public class Column
    {
        public string headerText { get; set; }
        public bool hidden { get; set; }
        public string key { get; set; }
        public string dataType { get; set; }
        public string width { get; set; } 
        public bool filterable { get; set; }
    }
 


}
