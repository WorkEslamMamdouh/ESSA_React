using Newtonsoft.Json; 
using System;
using System.Collections.Generic;
using System.Linq; 
using RestSharp; 

using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using System.Text;
using Newtonsoft.Json.Linq;
using Core.UI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Core.UI.IServices;
using Core.UI.Repository;

namespace Inv.API.Controllers
{

    [SecureHeadersFilter]
    [ActionMethod]
    public class EGTaxController : BaseController
    {
        private readonly _Interface _Services;
        private readonly ModelDbContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public EGTaxController(ModelDbContext dbContext, _Interface _I_Services, IWebHostEnvironment hostingEnvironment) : base(dbContext, hostingEnvironment)
        {
            this._dbContext = dbContext;
            this._Services = _I_Services;
            this._hostingEnvironment = hostingEnvironment;
        }


        public class TkenModelView
        {
            public string access_token { get; set; }
            public int expires_in { get; set; }
            public string token_type { get; set; }
            public string scope { get; set; }
        }

 
        public class CodeCategorization
        {
            public Level1 level1 { get; set; }
            public Level2 level2 { get; set; }
            public Level3 level3 { get; set; }
            public Level4 level4 { get; set; }
        }

        public class Level1
        {
            public int id { get; set; }
            public object lookupValue { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class Level2
        {
            public int id { get; set; }
            public object lookupValue { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class Level3
        {
            public int id { get; set; }
            public object lookupValue { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class Level4
        {
            public int id { get; set; }
            public object lookupValue { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class Metadata
        {
            public int totalPages { get; set; }
            public int totalCount { get; set; }
        }

        public class OwnerTaxpayer
        {
            public string rin { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class RequesterTaxpayer
        {
            public string rin { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }

        public class Result
        {
            public int codeUsageRequestID { get; set; }
            public string codeTypeName { get; set; }
            public int codeID { get; set; }
            public string itemCode { get; set; }
            public string codeNamePrimaryLang { get; set; }
            public string codeNameSecondaryLang { get; set; }
            public string descriptionPrimaryLang { get; set; }
            public string descriptionSecondaryLang { get; set; }
            public int parentCodeID { get; set; }
            public string parentItemCode { get; set; }
            public string parentCodeNamePrimaryLang { get; set; }
            public string parentCodeNameSecondaryLang { get; set; }
            public string parentLevelName { get; set; }
            public string levelName { get; set; }
            public DateTime requestCreationDateTimeUtc { get; set; }
            public DateTime codeCreationDateTimeUtc { get; set; }
            public DateTime activeFrom { get; set; }
            public Nullable<DateTime> activeTo { get; set; }
            public bool active { get; set; }
            public string status { get; set; }
            public object statusReason { get; set; }
            public OwnerTaxpayer ownerTaxpayer { get; set; }
            public RequesterTaxpayer requesterTaxpayer { get; set; }
            public CodeCategorization codeCategorization { get; set; }
        }

        public class RootCode
        {
            public List<Result> result { get; set; }
            public Metadata metadata { get; set; }
        }
        public class ParentCodeCategorization
        {
            public Level1 level1 { get; set; }
            public Level2 level2 { get; set; }
            public Level3 level3 { get; set; }
            public object level4 { get; set; }
        }
        public class Rootitem
        {
            public int codeID { get; set; }
            public int codTypeID { get; set; }
            public int codeTypeLevelID { get; set; }
            public string codeTypeName { get; set; }
            public object linkedCode { get; set; }
            public string itemCode { get; set; }
            public string codeName { get; set; }
            public string codeNameAr { get; set; }
            public string description { get; set; }
            public string descriptionAr { get; set; }
            public DateTime activeFrom { get; set; }
            public object activeTo { get; set; }
            public bool active { get; set; }
            public CodeCategorization codeCategorization { get; set; }
            public Taxpayer taxpayer { get; set; }
            public string parentItemCode { get; set; }
            public string parentCodeName { get; set; }
            public string parentCodeNameAr { get; set; }
            public string parentDescription { get; set; }
            public string parentDescriptionAr { get; set; }
            public ParentCodeCategorization parentCodeCategorization { get; set; }
            public object parentActiveTo { get; set; }
            public DateTime parentActiveFrom { get; set; }
            public bool parentActive { get; set; }
            public DateTime creationDateTimeUTC { get; set; }
            public object lastModificationDateTimeUTC { get; set; }
            public List<object> parentAttributes { get; set; }
            public List<object> attributes { get; set; }
            public bool hasUsageRegistered { get; set; }
        }
        public class Taxpayer
        {
            public string rin { get; set; }
            public string name { get; set; }
            public string nameAr { get; set; }
        }
        public class TEMPCODE
        {
            public int ID { get; set; }
            public string Code { get; set; }
        }
        public class passedItems
        {
            public string itemCode { get; set; }
            public int codeUsageRequestId { get; set; }
        }
        public class FailedItem
        {
            public int index { get; set; }
            public List<string> errors { get; set; }
        }

        public class RootFailedItem
        {
            public int passedItemsCount { get; set; }
            public List<FailedItem> failedItems { get; set; }
            public List<passedItems> passedItems { get; set; }
        }

        internal static string CreateTokin(string ClientID, string SecretID)
        {
            RestClient client = new RestClient();
            client = new RestClient("https://id.eta.gov.eg/connect/token");
            var request = new RestRequest();
            request.Method = Method.Post;
            //request.Timeout = -1;
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("client_secret", "" + SecretID + "");
            request.AddParameter("client_id", "" + ClientID + "");
            request.AddParameter("scope", "InvoicingAPI");
            request.AddParameter("grant_type", "client_credentials");
            RestResponse response = client.Execute(request);
            return response.Content.ToString();
        }

    }


}