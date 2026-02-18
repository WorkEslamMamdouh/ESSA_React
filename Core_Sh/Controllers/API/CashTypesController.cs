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
using Microsoft.EntityFrameworkCore.Metadata;


namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class CashTypesController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public CashTypesController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string UpdateList([FromBody] DataModel model)
        {
            List<D_A_CashTypes> obj = JsonConvert.DeserializeObject<List<D_A_CashTypes>>(model.DataSend);

            try
            {



                List<D_A_CashTypes> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<D_A_CashTypes> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<D_A_CashTypes> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    var resdata = _Services.InsertD_A_CashTypes(item); 
                    TransactionProcess(Convert.ToInt16(resdata.CompCode), 1, resdata.CashTypeID, "CashBox", "Add", db);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateD_A_CashTypes(item);

                }
                foreach (var item in DeletedItems)
                {
                    //_Services.DeleteD_A_CashTypes(Convert.ToInt16(item.CashTypeID));

                    ExecuteSqlCommand("delete D_A_CashTypes where CashTypeID = " + item.CashTypeID);
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