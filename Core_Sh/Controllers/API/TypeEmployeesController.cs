using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Core.UI.Repository;
using Core.UI.Models;
using System.Reflection;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using Core.UI.Repository.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using Core.UI.IServices;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Components;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Reflection.Emit; 


namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class TypeEmployeesController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public TypeEmployeesController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string UpdateList([FromBody] DataModel model)
        {
            List<G_TypeEmployees> obj = JsonConvert.DeserializeObject<List<G_TypeEmployees>>(model.DataSend);

            try
            {
                


                List<G_TypeEmployees> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<G_TypeEmployees> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<G_TypeEmployees> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    _Services.InsertG_TypeEmployees(item);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateG_TypeEmployees(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteG_TypeEmployees(Convert.ToInt16(item.IDTypeEmp));
                }

                return OkStr(new BaseResponse(true));

            }
            catch (Exception ex)
            { 
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }


    }
}