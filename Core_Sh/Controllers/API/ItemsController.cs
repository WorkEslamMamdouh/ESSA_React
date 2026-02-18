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
using Microsoft.Extensions.Hosting.Internal;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class ItemsController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ItemsController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }


		[HttpPost]
		public string Insert([FromBody] DataModel model)
		{
			try
			{
				// Deserialize MasterDetails object
				MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
				if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

				// Deserialize and populate D_I_Items
				D_I_Items d_I_Items = JsonConvert.DeserializeObject<D_I_Items>(JsonConvert.SerializeObject(obj.Master));

				// Deserialize and populate list of D_I_ItemUnits
				List<D_I_ItemUnits> d_I_ItemUnits = JsonConvert.DeserializeObject<List<D_I_ItemUnits>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<D_I_ItemUnits>();

				// Insert main item and get inserted item's details
				var itemInsert = _Services.InsertD_I_Items(d_I_Items);

				if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

				// Group item units by status
				var insertedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'i').ToList();
				var updatedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'u').ToList();
				var deletedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'd').ToList();

				// Insert new item units
				foreach (var item in insertedItems)
				{
					item.ItemID = itemInsert.ItemID;
					_Services.InsertD_I_ItemUnits(item);
				}

				// Update existing item units
				foreach (var item in updatedItems)
				{
					item.ItemID = itemInsert.ItemID;
					_Services.UpdateD_I_ItemUnits(item);
				}

				// Delete removed item units
				foreach (var item in deletedItems)
				{
					if (item.ItemUnitID.HasValue)
					{
						_Services.DeleteD_I_ItemUnits(Convert.ToInt16(item.ItemUnitID));
					}
				}

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.ItemID, "Items", "Add", db);
                if (res.ResponseState == true)
                {
                    itemInsert.ItemCode = res.ResponseData.ToString();
                    return OkStr(new BaseResponse(itemInsert));
                }
                else
                {
                    return OkStr(new BaseResponse(HttpStatusCode.ExpectationFailed, "Error"));
                }




                // Return success response
                return OkStr(new BaseResponse(true));
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

                // Deserialize and populate D_I_Items
                D_I_Items d_I_Items = JsonConvert.DeserializeObject<D_I_Items>(JsonConvert.SerializeObject(obj.Master));

                // Deserialize and populate list of D_I_ItemUnits
                List<D_I_ItemUnits> d_I_ItemUnits = JsonConvert.DeserializeObject<List<D_I_ItemUnits>>(JsonConvert.SerializeObject(obj.Details)) ?? new List<D_I_ItemUnits>();

                // Insert main item and get inserted item's details
                var itemInsert = _Services.UpdateD_I_Items(d_I_Items);

                if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

                // Group item units by status
                var insertedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'i').ToList();
                var updatedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'u').ToList();
                var deletedItems = d_I_ItemUnits.Where(x => x.StatusFlag == 'd').ToList();

                // Insert new item units
                foreach (var item in insertedItems)
                {
                    item.ItemID = itemInsert.ItemID;
                    _Services.InsertD_I_ItemUnits(item);
                }

                // Update existing item units
                foreach (var item in updatedItems)
                {
                    item.ItemID = itemInsert.ItemID;
                    _Services.UpdateD_I_ItemUnits(item);
                }

                // Delete removed item units
                foreach (var item in deletedItems)
                {
                    if (item.ItemUnitID.HasValue)
                    {
                        _Services.DeleteD_I_ItemUnits(Convert.ToInt16(item.ItemUnitID));
                    }
                }

                ResponseResult res = TransactionProcess(Convert.ToInt16(itemInsert.CompCode), 1, itemInsert.ItemID, "Items", "Update", db);
                if (res.ResponseState == true)
                {
                    itemInsert.ItemCode = res.ResponseData.ToString();
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


        public void UpdateReplaceData(int ItemID)
        {
            try
            {

                //**********************************************Update Replace Data***********************************************

                //int FinYear = DateTime.Now.Year;

                //var resultObject = GetDataFromRedis("IQ_ViewItems", "", "DataTable");

                // var ObjModel = SqlQuery<IQ_ViewItems>("Select * from IQ_ViewItems where ItemID = " + ItemID + "").FirstOrDefault();
                //var ModelRow = ObjModel;

                //var filteredResult = resultObject.OfType<IQ_ViewItems>().Where(x => !(x.ItemID == ObjModel.ItemID)).ToList();

                //if (ModelRow != null)
                //{
                //    filteredResult.Add(ModelRow);
                //}

                //var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);
                //// Save the result to a file
                //fileHandler.SetData(JsonConvert.SerializeObject(filteredResult, Formatting.Indented), "IQ_ViewItems", "DataTable");

                //************************************************************************************************

            }
            catch (Exception ex)
            {

            }
        }



    }
}