 
using Core.UI.Repository;
using Core.UI.Repository.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.UI.Models
{
    public class MasterDetails
    {  
        public object Master { get; set; }
        public List<object> Details { get; set; }
    }
}

 