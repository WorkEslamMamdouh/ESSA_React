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
using Microsoft.Extensions.Hosting.Internal;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class TypeTempExcelController : BaseController
    {
        private readonly _Interface _Services;
        public TypeTempExcelController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }

        [HttpPost]
        public string UpdateListTypeTempExcel([FromBody] DataModel model)
        {
            List<E_D_G_TypeTempExcel> obj = JsonConvert.DeserializeObject<List<E_D_G_TypeTempExcel>>(model.DataSend);

            try
            {

                List<E_D_G_TypeTempExcel> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<E_D_G_TypeTempExcel> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<E_D_G_TypeTempExcel> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    _Services.InsertE_D_G_TypeTempExcel(item);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateE_D_G_TypeTempExcel(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteE_D_G_TypeTempExcel(Convert.ToInt16(item.IDTypeTemp));
                }

                return OkStr(new BaseResponse(true));

            }
            catch (Exception ex)
            { 
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        } [HttpPost]
        public string UpdateListCreateTempExcel([FromBody] DataModel model)
        {
            List<E_D_G_CreateTempExcel> obj = JsonConvert.DeserializeObject<List<E_D_G_CreateTempExcel>>(model.DataSend);

            try
            {

                List<E_D_G_CreateTempExcel> InsertedItems = obj.Where(x => x.StatusFlag == 'i').ToList();
                List<E_D_G_CreateTempExcel> UpdatedItems = obj.Where(x => x.StatusFlag == 'u').ToList();
                List<E_D_G_CreateTempExcel> DeletedItems = obj.Where(x => x.StatusFlag == 'd').ToList();

                foreach (var item in InsertedItems)
                {
                    _Services.InsertE_D_G_CreateTempExcel(item);

                }
                foreach (var item in UpdatedItems)
                {
                    _Services.UpdateE_D_G_CreateTempExcel(item);

                }
                foreach (var item in DeletedItems)
                {
                    _Services.DeleteE_D_G_CreateTempExcel(Convert.ToInt16(item.IDTempExcel));
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