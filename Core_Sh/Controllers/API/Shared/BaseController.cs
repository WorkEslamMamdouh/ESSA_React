using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Core.UI.Repository;
using Core.UI.Models;
using System.Data;
using System.Reflection; 
using System.Security.AccessControl;
using Microsoft.EntityFrameworkCore.Storage; 
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Metadata;
using Core.UI.Repository.Models;
using System.IO;
using System.Net;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Collections.Generic;
using System; 
using System.ComponentModel.DataAnnotations.Schema; 
using Newtonsoft.Json.Linq;
using Core.Shared.DataManager;
using Core.UI.IServices;

using Microsoft.AspNetCore.Http;



namespace Core.UI.Controllers
{
    public class BaseController : Controller
    {

        protected ModelDbContext db;
        protected BaseResponse _BaseResponse = new BaseResponse();
        private readonly IWebHostEnvironment _hostingEnvironment;

        public BaseController(ModelDbContext dbContext, IWebHostEnvironment hostingEnvironment)
        {
            db = dbContext;
            _hostingEnvironment = hostingEnvironment;
        }




        public class DataModel
        {
            public string DataSend { get; set; }
        }
        public static string OkStr(object obj)
        {
            string jsonData = JsonConvert.SerializeObject(obj, Formatting.Indented);
            return jsonData;
        }
        //public JsonResult Ok(BaseResponse baseResponse)
        //{
        //    return Json(baseResponse);
        //}


        //public ActionResult Ok(object obj)
        //{
        //    var list = Json(obj);
        //    return list;
        //}


        protected string JsonSerialize(object obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            string result = JsonConvert.SerializeObject(obj, Formatting.Indented, settings);
            return result;
        }

        protected T JsonDeserialize<T>(string obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
            object objResult = (object)obj;
            T result = JsonConvert.DeserializeObject<T>(objResult.ToString(), settings);
            return result;
        }

        public object ConvertJsonToModel(object Object, string NameClass)
        {
            // Ensure NameClass includes the namespace, if not add it manually or as per your application's namespace
            string fullyQualifiedNameClass = NameClass.Contains(".") ? NameClass : $"Core.UI.Repository.Models.{NameClass}";

            // Attempt to get the type directly
            Type type = Type.GetType(fullyQualifiedNameClass);

            if (type == null)
            {
                // Try to find the type within the loaded assemblies
                type = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.Name.Equals(NameClass, StringComparison.OrdinalIgnoreCase));
            }

            if (type == null)
            {
                throw new InvalidOperationException($"Type '{NameClass}' not found.");
            } 

            string DataJson = JsonConvert.SerializeObject(Object, Formatting.None);
            return GetObjectClass(DataJson, type);
        }

        private object GetObjectClass(string jsonData, Type type)
        {
            return JsonConvert.DeserializeObject(jsonData, typeof(List<>).MakeGenericType(type));
        }


        public void BeginTransaction()
        {
            ExecuteSqlCommand("BEGIN TRANSACTION;");
        }

        public void RollBack()
        {
            ExecuteSqlCommand("ROLLBACK;");
        }
        public void Commit()
        {
            ExecuteSqlCommand("COMMIT;");
        }
 
        public int ExecuteSqlCommand(string Query)
        {
            int rowsAffected = 0;
            string connectionString = ConnectionString.connectionString;


            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(Query, con))
                    {
                        cmd.CommandType = System.Data.CommandType.Text;
                        rowsAffected = cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception, log, or throw if necessary
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return rowsAffected;
        }

        public List<T> SqlQuery<T>(string query) where T : new()
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    DataTable table = new DataTable();
                    table.Load(reader);

                    string jsonResult = JsonConvert.SerializeObject(table);
                    List<T> obj = JsonConvert.DeserializeObject<List<T>>(jsonResult);

                    return obj;
                }
            }
        }


        public ResponseResult TransactionProcess(int CompCode, int BranchCode, int? id, string type, string OpMode, ModelDbContext _db)
        {

            ResponseResult result = new ResponseResult();

            // Replace with your actual connection string

            using (SqlConnection connection = new SqlConnection(ConnectionString.connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand("dbo.G_ProcessTrans", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Input parameters
                    command.Parameters.AddWithValue("@Comp", CompCode);
                    command.Parameters.AddWithValue("@Branch", BranchCode);
                    command.Parameters.AddWithValue("@TrType", type);
                    command.Parameters.AddWithValue("@OpMode", OpMode);
                    command.Parameters.AddWithValue("@TrID", id);

                    // Output parameters
                    SqlParameter trNoParameter = new SqlParameter("@TrNo", SqlDbType.Int);
                    trNoParameter.Direction = ParameterDirection.Output;
                    command.Parameters.Add(trNoParameter);

                    SqlParameter okParameter = new SqlParameter("@Ok", SqlDbType.Int);
                    okParameter.Direction = ParameterDirection.Output;
                    command.Parameters.Add(okParameter);

                    // Execute the stored procedure
                    command.ExecuteNonQuery();

                    // Retrieve the output parameters, handling DBNull.Value
                    int trNo = trNoParameter.Value != DBNull.Value ? (int)trNoParameter.Value : 0;
                    int ok = okParameter.Value != DBNull.Value ? (int)okParameter.Value : 0;

                    result.ResponseState = ok == 0 ? true : false;
                    result.ResponseData = trNo;

                    // Display the results
                    //Console.WriteLine($"@TrNo: {trNo}");
                    //Console.WriteLine($"@Ok: {ok}");
                }
                connection.Close();
            }

            return result;

        }


        public List<object> GetDataFromRedis(string NameTable, string Condition, string NameFolder)
        {
            try
            {
                // Initialize the file handler with the provided hosting environment
                var fileHandler = new PostAndGetInTextFile(_hostingEnvironment);

                // Retrieve the data from the file (assuming the file returns a JSON string)
                var result = fileHandler.GetData(NameTable, NameFolder);

                if (string.IsNullOrEmpty(result))
                {
                    // Return an appropriate response if no data is found
                    return null;
                }

                object resultObject = GetConvertJsonToClass(result, NameTable);

                // Check if resultObject is a List<T> or an object that can be filtered
                var filteredData = new List<object>();

                if (resultObject is IEnumerable<object> dataList)
                {
                    // Apply the condition filter if it's not empty
                    if (!string.IsNullOrEmpty(Condition))
                    {
                        filteredData = ApplyConditionToList(dataList, Condition);
                    }
                    else
                    {
                        filteredData = dataList.ToList();
                    }
                }

                return filteredData;
            }
            catch (JsonException jsonEx)
            {
                // Log the exception or handle as required
                Console.WriteLine($"Error in deserialization: {jsonEx.Message}");
                return null;
            }
        }

        public object DeserializeBigData(string bigData)
        {
            try
            {
                // Use JsonSerializer for better performance
                var serializer = new JsonSerializer();

                // Using MemoryStream to work with large data
                using (var reader = new StringReader(bigData))
                using (var jsonReader = new JsonTextReader(reader))
                {
                    // Deserialize directly from the reader to avoid memory overhead
                    object resultObject = serializer.Deserialize(jsonReader);
                    return resultObject;
                }
            }
            catch (JsonException ex)
            {
                // Log and handle error
                Console.WriteLine($"Error deserializing large data: {ex.Message}");
                return null;
            }
        }

        // Cache the deserialization function for the generic type to avoid repeated reflection
        private static readonly Dictionary<string, Type> TypeCache = new Dictionary<string, Type>();
        private static readonly Dictionary<string, Func<string, object>> DeserializationFuncCache = new Dictionary<string, Func<string, object>>();

        private object GetConvertJsonToClass(string jsonData, string NameClass)
        {
            try
            {
                // First, check if the deserialization function exists in cache
                if (!DeserializationFuncCache.TryGetValue(NameClass, out var deserializationFunc))
                {
                    // Ensure NameClass includes the namespace, if not, add it manually or as per your application's namespace
                    string fullyQualifiedNameClass = NameClass.Contains(".") ? NameClass : $"Core.UI.Repository.Models.{NameClass}";

                    // Try to get the type from cache first
                    Type type;
                    if (!TypeCache.TryGetValue(fullyQualifiedNameClass, out type))
                    {
                        // Attempt to get the type directly
                        type = Type.GetType(fullyQualifiedNameClass);

                        if (type == null)
                        {
                            // Try to find the type within the loaded assemblies
                            type = AppDomain.CurrentDomain.GetAssemblies()
                                .SelectMany(a => a.GetTypes())
                                .FirstOrDefault(t => t.Name.Equals(NameClass, StringComparison.OrdinalIgnoreCase));
                        }

                        if (type == null)
                        {
                            throw new InvalidOperationException($"Type '{NameClass}' not found.");
                        }

                        // Cache the type for future use
                        TypeCache[fullyQualifiedNameClass] = type;
                    }

                    // Create the deserialization function for this type
                    var listType = typeof(List<>).MakeGenericType(type);
                    deserializationFunc = (json) => JsonConvert.DeserializeObject(json, listType);

                    // Cache the deserialization function for future use
                    DeserializationFuncCache[NameClass] = deserializationFunc;
                }

                // Use the cached deserialization function to deserialize the JSON
                return deserializationFunc(jsonData);
            }
            catch (Exception ex)
            {
                // Log the error or handle accordingly
                Console.WriteLine($"Error converting JSON to class: {ex.Message}");
                return null;
            }
        }



        public List<object> ApplyConditionToList(IEnumerable<object> dataList, string condition)
        {
            var filteredList = new List<object>();

            foreach (var item in dataList)
            {
                var itemType = item.GetType();
                bool matchesCondition = EvaluateCondition(item, condition);

                if (matchesCondition)
                {
                    filteredList.Add(item);
                }
            }

            return filteredList;
        }

        private bool EvaluateCondition(object item, string condition)
        {
            // Split the condition (e.g., "COMP_CODE = 8 and DETAIL = 1")
            var conditions = condition.Split(new[] { " and " }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var cond in conditions)
            {
                var parts = cond.Split('=');
                if (parts.Length != 2) continue;

                var fieldName = parts[0].Trim();
                var expectedValue = parts[1].Trim();

                var itemType = item.GetType();
                var property = itemType.GetProperty(fieldName);

                if (property == null)
                {
                    return false; // Field does not exist in the item
                }

                var actualValue = property.GetValue(item)?.ToString();

                // Compare the actual value with the expected value
                if (actualValue == null || !actualValue.Equals(expectedValue, StringComparison.OrdinalIgnoreCase))
                {
                    return false; // Value does not match
                }
            }

            return true; // All conditions are satisfied
        }


    }
}
