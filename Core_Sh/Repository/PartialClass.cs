using Core.UI.Repository.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data; 
using System.Globalization;

namespace Core
{


    public static class ObjectExtensions
    {
        public static void SetObject<T>(this T target, object source)
        {
            string ObjJson = JsonConvert.SerializeObject(source);
             target = JsonConvert.DeserializeObject<T>(ObjJson);
        }
    }

    static partial class ConnectionString
    {
        public static string connectionString { get; set; }
        public static string CompanyEmail { get; set; }
        public static string CompanyPassEmail { get; set; }
        public static string Url_APITax { get; set; }
        public static string PathSaveData { get; set; }
        public static string FlageRun { get; set; }
        public static string FlageRun_Redis { get; set; }

    }

    static partial class G_System
    {
        public static string Language { get; set; }

    }

    public partial class G_ProcessTransResult
    {
        public int TrNo { get; set; }
        public int Ok { get; set; }
    }


    public class ResponseResult
    {
        public string ResponseMessage { get; set; }
        public object ResponseData { get; set; }
        public bool ResponseState { get; set; }
    }

    public class CustomDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            if (reader.Value != null && reader.ValueType == typeof(string))
            {
                string dateString = (string)reader.Value;
                if (DateTime.TryParseExact(dateString, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
                {
                    return result;
                }
            }

            return existingValue;
        }

        public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

    }
}
