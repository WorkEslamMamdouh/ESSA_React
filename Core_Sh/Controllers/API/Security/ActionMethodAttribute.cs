using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Collections;
using System.Reflection;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

public class ActionMethodAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {


        //*************************ValidateToken*******************************

        var headers = context.HttpContext.Request.Headers;

        // مثال: قراءة هيدر باسم "X-Custom-Token"
        if (headers.TryGetValue("ESSA-Token", out var tokenValue))
        {

            bool isValid = XorCrypto.ValidateToken(tokenValue, "QDYxOUA2MTlANjE5QA==");

            // مثال: فلترة بناءً على القيمة
            if (!isValid)
            {
                context.Result = new ContentResult
                {
                    Content = "Token غير صحيح",
                    StatusCode = 403
                };
                return;
            }
        }
        else
        {
            context.Result = new ContentResult
            {
                Content = "الهيدر X-Custom-Token غير موجود",
                StatusCode = 400
            };
            return;
        }


        //*************************************************************************

        var methodName = context.ActionDescriptor.RouteValues["action"];



        //************************* Validate Data Send Sql by TS *******************************

        if (methodName == "Get_TableNew" || methodName == "Get_TableNew_Pagination")
        {


            var arguments = context.ActionArguments;

            foreach (var arg in arguments)
            {
                var value = arg.Value;
                if (value == null) continue;

                if (value is IEnumerable enumerable && !(value is string))
                {
                    foreach (var item in enumerable)
                    {
                        if (item == null) continue;

                        ProcessObject(item, context);
                        if (context.Result != null) return;
                    }
                }
                else
                {
                    ProcessObject(value, context);
                    if (context.Result != null) return;
                }
            }

        }

        //*************************************************************************









        base.OnActionExecuting(context);
    }

    private void ProcessObject(object obj, ActionExecutingContext context)
    {
        var type = obj.GetType();
        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var prop in properties)
        {
            var propName = prop.Name;
            var propValue = prop.GetValue(obj);

            // التحقق من قيمة الاسم
            if (propName == "Name" && propValue is string name)
            {
                if (string.IsNullOrWhiteSpace(name) || name.Contains("مرفوض"))
                {
                    context.Result = new ContentResult
                    {
                        Content = "تم رفض عنصر بسبب قيمة غير صالحة في خاصية Name.",
                        StatusCode = 400
                    };
                    return;
                }
            }

            // فك التشفير
            if ((propName == "SearchValue" || propName == "OrderByID" || propName == "Condition" || propName == "NameTable") && prop.CanWrite && propValue is string strValue)
            {
                try
                {
                    string decrypted = XorCrypto.Decrypt(strValue, "QDYxOUA2MTlANjE5QA==");
                    prop.SetValue(obj, decrypted);
                }
                catch
                {
                    context.Result = new ContentResult
                    {
                        Content = $"فشل في فك تشفير الخاصية {propName}.",
                        StatusCode = 400
                    };
                    return;
                }
            }
        }
    }


}
