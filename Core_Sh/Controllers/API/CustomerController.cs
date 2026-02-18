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
    public class CustomerController : BaseController
    {
        private readonly _Interface _Services;

        private readonly IWebHostEnvironment _hostingEnvironment;
        public CustomerController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }


        [HttpPost]
        public string Update([FromBody] DataModel model)
        {
            try
            {
                D_Customer obj = JsonConvert.DeserializeObject<D_Customer>(model.DataSend);
                var ObjUpdated = _Services.UpdateD_Customer(obj);

                //UpdateReplaceData(ObjUpdated);

                return OkStr(new BaseResponse(true));

            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }

        }


        [HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
                D_Customer obj = JsonConvert.DeserializeObject<D_Customer>(model.DataSend);
                var ObjInserted = _Services.InsertD_Customer(obj);
                var Type = "Customer";
                ResponseResult res = TransactionProcess(Convert.ToInt16(ObjInserted.CompCode), 1, ObjInserted.CustomerId, Type, "Add", db);
                if (res.ResponseState == true)
                {
                    //UpdateReplaceData(ObjInserted);

                    return OkStr(new BaseResponse(true));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }
            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }
        }
        [HttpGet]
        public string checkDuplicatedCode(int CompCode, int CustomerId, string CustomerCode)
        {
            try
            {
                var Count = SqlQuery<CustomCount>("select Count(*) as Count from D_Customer where  CustomerCODE ='" + CustomerCode + "'  and CustomerId != " + CustomerId + " ").FirstOrDefault();
                return OkStr(new BaseResponse(Count.count));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        [HttpGet]
        public string checkDuplicatedCOMP_CODE(int COMP_CODE)
        {
            try
            {
                var Count = SqlQuery<CustomCount>("select Count(*) as Count from COMP_CODE where  COMP_CODE ='" + COMP_CODE + "'").FirstOrDefault();
                return OkStr(new BaseResponse(Count.count));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

        public void UpdateReplaceData(D_Customer ObjModel)
        {
            try
            {

                //**********************************************Update Replace Data***********************************************

                int FinYear = DateTime.Now.Year;

                var resultObject = GetDataFromRedis("D_Customer", "", "DataTable");

                var ModelRow = SqlQuery<D_Customer>("Select * from D_Customer where CustomerId = " + ObjModel.CustomerId + "").FirstOrDefault();
                //var ModelRow = ObjModel;

                var filteredResult = resultObject.OfType<D_Customer>().Where(x => !(x.CustomerId == ObjModel.CustomerId)).ToList();

                if (ModelRow != null)
                {
                    filteredResult.Add(ModelRow);
                }

                var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
                // Save the result to a file
                fileHandler.SetData(JsonConvert.SerializeObject(filteredResult, Formatting.Indented), "D_Customer", "DataTable");

                //************************************************************************************************

            }
            catch (Exception ex)
            {

            }
        }









    }
}