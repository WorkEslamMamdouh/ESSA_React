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
    public class D_G_StoreController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public D_G_StoreController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string UpdateList([FromBody] DataModel model)
        {
            List<D_G_Store> obj = JsonConvert.DeserializeObject<List<D_G_Store>>(model.DataSend);

            try
            {



                List<D_G_Store> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<D_G_Store> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<D_G_Store> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    var resdata = _Services.InsertD_G_Store(item); 
 
                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateD_G_Store(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteD_G_Store(Convert.ToInt16(item.StoreID));

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