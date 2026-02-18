using Core.UI.Controllers;
using Core.UI.IServices;
using Core.UI.Models;
using Core.UI.Repository;
using Core.UI.Repository.Models;
using Core_Sh.Models;
using Grpc.Core;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System.Data;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Xml;
using static Inv.API.Controllers.EGTaxController;
using Formatting = Newtonsoft.Json.Formatting;


namespace Core.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;



        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly DeviceIdProvider _deviceIdProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public HomeController(ILogger<HomeController> logger, ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment , IHttpContextAccessor httpContextAccessor, DeviceIdProvider deviceIdProvider  ) : base(dbContext, hostingEnvironment)
        {
            _logger = logger;
            db = dbContext;
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _deviceIdProvider = deviceIdProvider;
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //*************************************************GetData_Redis
        [HttpGet]
        public string GetData_Redis()
        {

            try
            {
                 
                 
                string deviceId = GetIdDevice();

                ExecuteSqlCommand(" exec G_InsertIDServerDeviceInData_Redis '" + deviceId + "'");

                ExecuteSqlCommand("update [dbo].[G_Data_Redis] set Status = 0");

                var data_Redis = new Data_Redis(db, _hostingEnvironment, _deviceIdProvider);


                data_Redis.GetData_RedisAllTables(_hostingEnvironment);


                return OkStr("Done Refrash Data");

            }
            catch (Exception ex)
            {


                return OkStr(ex.Message); 
            }
            finally
            {
                // Reset the flag 
            }
        }


        public string GetIdDevice()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return GetWebServerUuid();
            }
            else
            {
                return GetDesktopUuid();
            }
        }

        private string GetWebServerUuid()
        {
            try { return Environment.MachineName; }
            catch { return "UNKNOWN-SERVER"; }
        }

        private string GetDesktopUuid()
        {
            try
            {
                return $"{Environment.UserName}-{Environment.MachineName}";
            }
            catch
            {
                return "UNKNOWN-DESKTOP";
            }
        }

        //*********************************************************************


        //[HttpGet]
        //public IActionResult PrintTax(int CompCode, string DocUUID, string Lang)
        //{
        //    return Content("PrintTax action reached successfully  CompCode = "+ CompCode + "   &  DocUUID = "+ DocUUID + " & Lang = " + Lang + "");
        //}


        [HttpGet]
        public IActionResult PrintTax(int CompCode, string DocUUID, string Lang)
        {
            try
            {
                var controlTax = SqlQuery<I_Control>(
                    $"select * from I_Control where CompCode = {CompCode}"
                ).FirstOrDefault();

                if (controlTax == null)
                {
                    return StatusCode(500, $"I_Control not found for CompCode = {CompCode}");
                }

                // ✅ TLS mandatory
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // ===================== TOKEN =====================
                using var httpClient = new HttpClient();
                httpClient.Timeout = TimeSpan.FromSeconds(30);

                var tokenRequest = new HttpRequestMessage(
                    HttpMethod.Post,
                    "https://id.eta.gov.eg/connect/token"
                );

                tokenRequest.Content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "client_id", controlTax.EGTax_ClientIDProd },
            { "client_secret", controlTax.EGTax_SecretIDProd },
            { "grant_type", "client_credentials" },
            { "scope", "InvoicingAPI" }
        });

                var tokenResponse = httpClient.SendAsync(tokenRequest).Result;

                if (!tokenResponse.IsSuccessStatusCode)
                {
                    return StatusCode(
                        (int)tokenResponse.StatusCode,
                        tokenResponse.Content.ReadAsStringAsync().Result
                    );
                }

                var tokenJson = tokenResponse.Content.ReadAsStringAsync().Result;

                var token = JsonConvert.DeserializeObject<TkenModelView>(tokenJson);

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    return StatusCode(500, "Invalid token response");
                }

                // ===================== PDF =====================
                var pdfRequest = new HttpRequestMessage(
                    HttpMethod.Get,
                    $"https://api.invoicing.eta.gov.eg/api/v1/documents/{DocUUID}/pdf"
                );

                pdfRequest.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", token.access_token);

                pdfRequest.Headers.Add("Accept-Language", Lang);

                var pdfResponse = httpClient.SendAsync(pdfRequest).Result;

                if (!pdfResponse.IsSuccessStatusCode)
                {
                    return StatusCode(
                        (int)pdfResponse.StatusCode,
                        pdfResponse.Content.ReadAsStringAsync().Result
                    );
                }

                var pdfBytes = pdfResponse.Content.ReadAsByteArrayAsync().Result;

                if (pdfBytes == null || pdfBytes.Length == 0)
                {
                    return StatusCode(500, "ETA returned empty PDF");
                }

                 

                return File(pdfBytes, "application/pdf" , DocUUID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
         

        #region indexPage

        public class AllPages
        {
            public string ModuleCode { get; set; }
            public string Page_Html { get; set; }
        }


        [HttpGet]
        public string GetPagesLogin_Home()
        {




            string[] AllPath_Url = {

         "LoginIndex",
         "HomeLoderIndex",
         "HomeIndex",
         "AdminCompanyIndex",

                      };
            List<AllPages> AllHtmlPages = new List<AllPages>();

            for (int i = 0; i < AllPath_Url.Length; i++)
            {
                ContentResult PageContent = new ContentResult();
                AllPages OnePage = new AllPages();

                // Render the view to HTML
                string htmlContent = ViewToString(AllPath_Url[i]);
                PageContent = Content(htmlContent, "text/html");

                string Lang = G_System.Language;

                OnePage.Page_Html = PageContent.Content.ToString();

                var parts = AllPath_Url[i].Split('/');
                string ModuleCode = parts[parts.Length - 1].ToString();
                ModuleCode = ModuleCode.Replace("Index", "");

                OnePage.ModuleCode = ModuleCode;

                AllHtmlPages.Add(OnePage);

            }

            string jsonData = JsonConvert.SerializeObject(AllHtmlPages, Formatting.Indented);


            return jsonData;
        }


        [HttpPost]
        public IActionResult ChangeLanguage(string language)
        {

            // Store the selected language in a cookie
            // Delete the "selectedLanguage" cookie
            Response.Cookies.Delete("selectedLanguage");

            Response.Cookies.Append("selectedLanguage", language);

            CultureInfo.CurrentCulture = new CultureInfo(language);
            CultureInfo.CurrentUICulture = new CultureInfo(language);

            return Ok();

        }



        [HttpGet]
        public string GetAllUserPrivilageNew(int CompCode, string RoleIds, string NameFolder, int FIN_YEAR)
        {
            if (RoleIds == null)
            {
                return "";

            }
            GetPrivilage_Pages getPrivilage_Pages = new GetPrivilage_Pages();

            var GetPrivilage = new List<object>();

            // Split the RoleIds by comma
            var roleIdList = RoleIds.Split(',');

            foreach (var RoleId in roleIdList)
            {
                var Privilage = GetDataFromRedis("IQ_G_RoleModule", " CompCode = " + CompCode + " and RoleId = " + RoleId + " and FIN_YEAR = " + FIN_YEAR, NameFolder);

                if (Privilage != null)
                {
                    GetPrivilage.AddRange(Privilage);
                }
            }

            if (GetPrivilage == null || GetPrivilage.Count == 0)
            {
                return OkStr(getPrivilage_Pages);
            }

            string AllPages = GetAllViewNew(GetPrivilage);

            getPrivilage_Pages.UserPrivilege = GetPrivilage;
            getPrivilage_Pages.AllPages = AllPages;

            return OkStr(getPrivilage_Pages);
        }



        [HttpGet]
        public string GetAllViewNew(List<object> ListModules)
        {



            //   string[] AllPath_Url = {

            //"LoginIndex",
            //"HomeIndex",
            //"AdminCompanyIndex",

            //             };
            List<AllPages> AllHtmlPages = new List<AllPages>();

            //for (int i = 0; i < AllPath_Url.Length; i++)
            //{
            //    ContentResult PageContent = new ContentResult();
            //    AllPages OnePage = new AllPages();

            //    // Render the view to HTML
            //    string htmlContent = ViewToString(AllPath_Url[i]);
            //    PageContent = Content(htmlContent, "text/html");

            //    string Lang = G_System.Language;

            //    OnePage.Page_Html = PageContent.Content.ToString();

            //    var parts = AllPath_Url[i].Split('/');
            //    string ModuleCode = parts[parts.Length - 1].ToString();
            //    ModuleCode = ModuleCode.Replace("Index", "");

            //    OnePage.ModuleCode = ModuleCode;

            //    AllHtmlPages.Add(OnePage);

            //}

            for (int i = 0; i < ListModules.Count; i++)
            {
                ContentResult PageContent = new ContentResult();
                AllPages OnePage = new AllPages();

                var yourObject = ListModules[i];
                string propertyName = "MODULE_CODE";

                // Use reflection to get the value of the property
                PropertyInfo propertyInfo = yourObject.GetType().GetProperty(propertyName);

                object value = propertyInfo.GetValue(yourObject);

                // Render the view to HTML
                string htmlContent = ViewToString(value?.ToString() + "Index");
                PageContent = Content(htmlContent, "text/html");

                OnePage.Page_Html = PageContent.Content.ToString();


                OnePage.ModuleCode = value?.ToString();

                AllHtmlPages.Add(OnePage);

            }

            string jsonData = JsonConvert.SerializeObject(AllHtmlPages, Formatting.Indented);


            return jsonData;
        }

        [HttpGet]
        public string GetAllUserPrivilageNewOld(int year, int compCode, int branchCode, string UserCode, string SystemCode, string SubSystemCode)
        {

            //_languageService.SetSelectedLanguage("ar");

            GetPrivilage_Pages getPrivilage_Pages = new GetPrivilage_Pages();
            string Modulecode = "";
            string query = "SELECT * FROM [dbo].[GFunc_GetPrivilage] (" + year + "," + compCode + "," + branchCode + ",'" + UserCode + "', '" + SystemCode + "','" + Modulecode + "') where Access = 1 or AVAILABLE = 1";

            List<UserPrivilege> GetPrivilage = SqlQuery<UserPrivilege>(query).ToList();

            //string AllPages = GetAllViewNew(GetPrivilage.ToList());

            //getPrivilage_Pages.UserPrivilege = GetPrivilage;
            //getPrivilage_Pages.AllPages = AllPages;

            return OkStr(getPrivilage_Pages);
        }



        [HttpGet]
        public string GetAllUserPrivilage(int year, int compCode, int branchCode, string UserCode, string SystemCode, string SubSystemCode)
        {
            string Modulecode = "";
            string query = "SELECT * FROM [dbo].[GFunc_GetPrivilage] (" + year + "," + compCode + "," + branchCode + ",'" + UserCode + "', '" + SystemCode + "','" + Modulecode + "') where Access = 1 or AVAILABLE = 1";

            List<UserPrivilege> result = SqlQuery<UserPrivilege>(query).ToList();

            //var result = SQLModelQuery(query, "UserPrivilege");

            //List<UserPrivilege> result = db.Database.ExecuteSqlRaw<UserPrivilege>(query).Where(row => row.Access == true || row.AVAILABLE == true).ToList();

            return OkStr(result);
        }



        [HttpGet]
        public string GetAllView()
        {
            //var liest = ExecuteQuery("Select * from [dbo].[Sls_Invoice]");
            //var liest = ExecuteSqlCommand("Select * from [dbo].[Sls_Invoice]" , "Sls_Invoice");

            var ListModules = db.G_MODULES.Where(x => x.AVAILABLE == true).ToList();

            List<AllPages> AllHtmlPages = new List<AllPages>();

            for (int i = 0; i < ListModules.Count; i++)
            {
                ContentResult PageContent = new ContentResult();
                AllPages OnePage = new AllPages();

                // Render the view to HTML
                string htmlContent = ViewToString(ListModules[i].MODULE_CODE + "Index");
                PageContent = Content(htmlContent, "text/html");

                OnePage.Page_Html = PageContent.Content.ToString();


                OnePage.ModuleCode = ListModules[i].MODULE_CODE;

                AllHtmlPages.Add(OnePage);

            }

            string jsonData = JsonConvert.SerializeObject(AllHtmlPages, Formatting.Indented);


            return jsonData;
        }

        public ActionResult OpenView(string moduleCode)
        {
            string viewPath = "";

            var method = this.GetType().GetMethod(moduleCode + "Index");
            if (method != null)
            {
                object result = method.Invoke(this, null);

                if (result != null && result is string)
                {
                    // Check if the result is a string
                    viewPath = (string)result;

                    // Render the view to HTML
                    string htmlContent = ViewToString(viewPath);

                    return Content(htmlContent, "text/html");
                }

            }

            return Content("", "text/html");
        }

        private string ViewToString(string viewPath)
        {
            var viewEngine = HttpContext.RequestServices.GetService<ICompositeViewEngine>();

            try
            {
                var viewResult = viewEngine.FindView(ControllerContext, viewPath, false);

                if (!viewResult.Success)
                {
                    // Handle the case where the view was not found
                    return $"View not found: {viewPath}";
                }

                using (var sw = new StringWriter())
                {
                    var viewContext = new ViewContext(
                        ControllerContext,
                        viewResult.View,
                        ViewData,
                        TempData,
                        sw,
                        new HtmlHelperOptions()
                    );

                    viewResult.View.RenderAsync(viewContext).GetAwaiter().GetResult();

                    // Note: Omit the ReleaseView call, as it's often not needed

                    return sw.ToString();
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions that may occur during view rendering
                return $"Error rendering view: {ex.Message}";
            }
        }

        public IActionResult Index()
        {
            //return RedirectToAction("ContainerIndex", "Home");
            return View("htmlContainerIndex");
        }
        public IActionResult ContainerIndex()
        {
            return View("htmlContainerIndex");
        }


        #endregion indexPage



        #region call from client
        [HttpGet]
        public ActionResult Login(string Username, string Password)
        {

            return Json("The User has no access");
        }


        public ActionResult OpenImg(string path)
        {
            // Combine the path to the file with the root directory of your application

            string fullPath = GetServerPath(path);

            // Check if the file exists before returning it
            if (System.IO.File.Exists(fullPath))
            {
                // Determine the content type based on the file extension
                string contentType = "application/octet-stream"; // Default content type
                if (Path.GetExtension(fullPath) == ".jpg")
                {
                    contentType = "image/jpeg";
                }

                // Return the file using FileContentResult
                byte[] fileBytes = System.IO.File.ReadAllBytes(fullPath);
                return File(fileBytes, contentType);
            }
            else
            {
                // If the file doesn't exist, return an error or handle it accordingly
                return null;
            }
        }

        public string GetServerPath(string virtualPath)
        {
            // Map the virtual path to the physical path
            string physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, virtualPath.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));

            return physicalPath;
        }

        public string TafkeetArabValue(decimal? Amount)
        {
            TafkeetArab TafkeetArab = new TafkeetArab();
            return TafkeetArab.BSE_TafkeetArab(" جـنيــه ", " قـرش ", Amount) + " فقـط لاغيـر ";
        }


        [HttpPost]
        public IActionResult InsertLogUser([FromBody] DataModel model)
        {
            ModelDataLogUser _DataLogUser = JsonConvert.DeserializeObject<ModelDataLogUser>(model.DataSend);

            try
            {
                if (_DataLogUser.DataLogUser.Trim() == "")
                {
                    return Ok(new BaseResponse(""));

                }
                else
                {
                    ExecuteSqlCommand(_DataLogUser.DataLogUser);
                }
            }
            catch (Exception)
            {

            }

            return Ok(new BaseResponse(""));

        }


        [HttpPost]
        public IActionResult Run_Trigger([FromBody] DataModel model)
        {
            ModelDataLogUser _DataLogUser = JsonConvert.DeserializeObject<ModelDataLogUser>(model.DataSend);

            try
            {
                if (_DataLogUser.DataLogUser.Trim() == "")
                {
                    return Ok(new BaseResponse(""));

                }
                else
                {
                    ExecuteSqlCommand(_DataLogUser.DataLogUser);
                }
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(ex.Message));

            }

            return Ok(new BaseResponse(""));

        }

        #endregion



    }
}