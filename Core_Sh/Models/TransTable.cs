using Core.UI.Repository;
using Core.UI.Repository.Models;

namespace Core.UI.Models
{
    public class TransTable
    {
        public string TableName { get; set; } = "";
        public object? Model { get; set; } = null;
        public List<object> ModelList { get; set; } = null;
        public string TypeTrans { get; set; } = "";
        public string ConditionSelectReturn { get; set; } = "";
    }
}

 