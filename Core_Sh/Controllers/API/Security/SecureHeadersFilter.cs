using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Collections;
using System.Reflection;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
public class SecureHeadersFilter : ResultFilterAttribute
{
    public override void OnResultExecuting(ResultExecutingContext context)
    {
        var headers = context.HttpContext.Response.Headers;

        headers["Content-Security-Policy"] = "default-src 'self'";
        headers["X-Content-Type-Options"] = "nosniff";
        headers["Referrer-Policy"] = "no-referrer-when-downgrade";
        headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()";

        base.OnResultExecuting(context);
    }
}
