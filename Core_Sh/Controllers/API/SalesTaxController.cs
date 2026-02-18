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
using Microsoft.Reporting.Map.WebForms.BingMaps; 
using KSAEinvoice;
using Microsoft.Extensions.Hosting.Internal; 
using RestSharp;
using static Inv.API.Controllers.EGTaxController;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class SalesTaxController : BaseController
    {
        private readonly _Interface _Services;
        private readonly ModelDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SalesTaxController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment  ) : base(dbContext, hostingEnvironment)
        {
            this._dbContext = dbContext;
            this._Services = _I_Services;
            this._hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
                // Deserialize MasterDetails object
                MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
                if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

                // Deserialize and populate I_TR_Sales
                I_TR_Sales I_TR_Sales = JsonConvert.DeserializeObject<I_TR_Sales>(JsonConvert.SerializeObject(obj.Master));

                // Deserialize and populate list of I_TR_SaleDetails
                List<I_TR_SaleDetails> I_TR_SaleDetails = JsonConvert.DeserializeObject<List<I_TR_SaleDetails>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<I_TR_SaleDetails>();

                // Insert main item and get inserted item's details
                var itemInsert = _Services.InsertI_TR_Sales(I_TR_Sales);

                if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

                // Group item units by status
                var insertedItems = I_TR_SaleDetails.Where(x => x.StatusFlag != 'd').ToList();
                //var updatedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'u').ToList();
                var deletedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'd').ToList();

                // Insert new item units
                foreach (var item in insertedItems)
                {
                    item.SaleID = itemInsert.SaleID;
                    _Services.InsertI_TR_SaleDetails(item);
                }

                string _Key = "SalesInv";
                if (itemInsert.TrType == 1 )
                {
                    _Key = "SalesRet";
                }

                if (itemInsert.TrType == 2)
                {
                    _Key = "ShowPrice";
                }

                if (itemInsert.TrType == 3)
                {
                    _Key = "JobOrder";
                }
                if (itemInsert.TrType == 4)
                {
                    _Key = "DelivOrder";
                }
                //// Update existing item units
                //foreach (var item in updatedItems)
                //{
                //    item.SaleID = itemInsert.SaleID;
                //    _Services.UpdateI_TR_SaleDetails(item);
                //}

                //// Delete removed item units
                foreach (var item in deletedItems)
                {
                    if (item.SaleDetailID.HasValue)
                    {
                        _Services.DeleteI_TR_SaleDetails(Convert.ToInt16(item.SaleDetailID));
                    }
                }

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.SaleID, _Key, "Add", db);
                if (res.ResponseState == true)
                {
                    itemInsert.TrNo = Convert.ToInt32(res.ResponseData);

                    //UpdateReplaceData(itemInsert);

                    return OkStr(new BaseResponse(itemInsert));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }


                // Return success response
                //return OkStr(new BaseResponse(itemInsert));
            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }
        [HttpPost]
        public string Update([FromBody] DataModel model)
        {
            try
            {
                // Deserialize MasterDetails object
                MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
                if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

                // Deserialize and populate I_TR_Sales
                I_TR_Sales I_TR_Sales = JsonConvert.DeserializeObject<I_TR_Sales>(JsonConvert.SerializeObject(obj.Master));

                // Deserialize and populate list of I_TR_SaleDetails
                List<I_TR_SaleDetails> I_TR_SaleDetails = JsonConvert.DeserializeObject<List<I_TR_SaleDetails>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<I_TR_SaleDetails>();

                // Insert main item and get inserted item's details
                var itemInsert = _Services.UpdateI_TR_Sales(I_TR_Sales);

                if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

                // Group item units by status
                var insertedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'i').ToList();
                var updatedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'u').ToList();
                var deletedItems = I_TR_SaleDetails.Where(x => x.StatusFlag == 'd').ToList();

                // Insert new item units
                foreach (var item in insertedItems)
                {
                    item.SaleID = itemInsert.SaleID;
                    _Services.InsertI_TR_SaleDetails(item);
                }

                // Update existing item units
                foreach (var item in updatedItems)
                {
                    item.SaleID = itemInsert.SaleID;
                    _Services.UpdateI_TR_SaleDetails(item);
                }

                // Delete removed item units
                foreach (var item in deletedItems)
                {
                    if (item.SaleDetailID.HasValue)
                    {
                        _Services.DeleteI_TR_SaleDetails(Convert.ToInt16(item.SaleDetailID));
                    }
                }
 

                string _Key = "SalesInv";
                if (itemInsert.TrType == 1)
                {
                    _Key = "SalesRet";
                }

                if (itemInsert.TrType == 2)
                {
                    _Key = "ShowPrice";
                }

                if (itemInsert.TrType == 3)
                {
                    _Key = "JobOrder";
                }
                if (itemInsert.TrType == 4)
                {
                    _Key = "DelivOrder";
                }


                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.SaleID, "SalesInv", "Update", db);
                if (res.ResponseState == true)
                {
                    itemInsert.TrNo = Convert.ToInt32(res.ResponseData);

                    //UpdateReplaceData(itemInsert); 

                    return OkStr(new BaseResponse(itemInsert));
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
            catch (InvalidOperationException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }
         
        [HttpGet]
        public string SendInvToTax(int SaleID)
        {
            try
            {
                DateTime _Date = DateTime.Now.Date;

                ExecuteSqlCommand("update I_TR_Sales set Status = 1 , TaxStatus = 0 , SaleDate = '"+ _Date + "' where  SaleID = " + SaleID);

                var dataInv = SqlQuery<I_TR_Sales>("Select * from I_TR_Sales where  SaleID = " + SaleID).FirstOrDefault();

                TaxResponse response = new TaxResponse();

                if (dataInv.TaxStatus == 0 ) //Stander
                {
                    TaxInv _TaxInv = new TaxInv(_dbContext, _Services, _hostingEnvironment);
                    response = _TaxInv.CreateXml_and_SendInv(Convert.ToInt16(dataInv.SaleID), "SaleID", "I_TR_Sales", "IQ_KSATaxInvHeader", "IQ_KSATaxInvItems", "IQ_KSATaxInvHeader_PerPaid", "");
                }

                if (!response.IsSuccess)
                {
                    ExecuteSqlCommand("update I_TR_Sales set Status = 0 , TaxStatus = -1 where  SaleID = " + SaleID); 
                    return OkStr(new BaseResponse(response));
                }

                ResponseResult res = TransactionProcess(Convert.ToInt16(dataInv.CompCode), 1, dataInv.SaleID, "SalesInv", "Update", db);
                if (res.ResponseState == true)
                {

                    response.Response = dataInv;

                    return OkStr(new BaseResponse(response));
                }
                else
                {
                    response.IsSuccess = false;
                    response.Response = "Error in TransactionProcess";
                    return OkStr(new BaseResponse(response));
                }

            }
            catch (ArgumentNullException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.BadRequest, ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
            catch (Exception ex)
            {
                return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

         



        public string GetServerPath(string virtualPath)
        {
            // Map the virtual path to the physical path
            string physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, virtualPath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));

            return physicalPath;
        }


        public void UpdateReplaceData(I_TR_Sales ObjModel)
        {
            try
            {

                //**********************************************Update Replace Data***********************************************

                //int FinYear = DateTime.Now.Year;

                //var resultObject = GetDataFromRedis("I_TR_Sales", "", "DataTable");

                ////   var ModelRow = SqlQuery<I_TR_Sales>("Select * from I_TR_Sales where SaleID = " + ObjInserted.SaleID + "").FirstOrDefault();
                //var ModelRow = ObjModel;

                //var filteredResult = resultObject.OfType<I_TR_Sales>().Where(x => !(x.SaleID == ObjModel.SaleID)).ToList();

                //if (ModelRow != null)
                //{
                //    filteredResult.Add(ModelRow);
                //}

                //var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
                //// Save the result to a file
                //fileHandler.SetData(JsonConvert.SerializeObject(filteredResult, Formatting.Indented), "I_TR_Sales", "DataTable");

                //************************************************************************************************

            }
            catch (Exception ex)
            {

            }
        }


    }
}