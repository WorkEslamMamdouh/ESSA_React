using Core.UI.IServices;
using Core.UI.Models;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace Core.UI.Controllers
{
    [SecureHeadersFilter]
    [ActionMethod]
    public class ItemTaxEGController : BaseController
    {
        private readonly _Interface _Services;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ItemTaxEGController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._Services = _I_Services;
        }


        [HttpPost]
        public string Insert([FromBody] DataModel model)
        {
            try
            {
                 MasterDetails obj = JsonConvert.DeserializeObject<MasterDetails>(model.DataSend);
                if (obj == null) throw new ArgumentNullException(nameof(obj), "Input data is invalid.");

                // Deserialize and populate D_I_ItemTaxEG
                D_I_ItemTaxEG d_I_ItemTaxEG = JsonConvert.DeserializeObject<D_I_ItemTaxEG>(JsonConvert.SerializeObject(obj.Master));


                // Insert main item and get inserted item's details
                var itemInsert = _Services.InsertD_I_ItemTaxEG(d_I_ItemTaxEG);



                return OkStr(new BaseResponse(itemInsert));

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

                // Deserialize and populate D_I_ItemTaxEG
                D_I_ItemTaxEG d_I_ItemTaxEG = JsonConvert.DeserializeObject<D_I_ItemTaxEG>(JsonConvert.SerializeObject(obj.Master));


                var itemInsert = _Services.UpdateD_I_ItemTaxEG(d_I_ItemTaxEG);

                if (itemInsert == null) throw new InvalidOperationException("Failed to insert main item.");

                return OkStr(new BaseResponse(itemInsert)); 


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
         
    }
}