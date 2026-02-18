using Core;
using System.Data.SqlClient;

public class DeviceIdProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DeviceIdProvider(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public void TrackThisDevice()
    {
        string deviceId = GetIdDevice();
        ExecuteSqlRaw(" exec G_InsertIDServerDeviceInData_Redis '" + deviceId + "'");
    }

    private int ExecuteSqlRaw(string query)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(ConnectionString.connectionString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    return cmd.ExecuteNonQuery();
                }
            }
        }
        catch
        {
            return 0;
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
}
