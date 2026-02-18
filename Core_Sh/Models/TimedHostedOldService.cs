using System;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using CheckPost;
using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CheckPost;
using Core.UI.Repository;
using Microsoft.Extensions.Hosting.Internal;

public class TimedHostedOldService : IHostedService, IDisposable
{
    private readonly ILogger<TimedHostedService> _logger;
    private readonly IWebHostEnvironment _hostingEnvironment;
    private readonly IServiceScopeFactory _scopeFactory;

    private Timer _SystemTimer;
    private Timer _triggerTimer;
    private Timer _triggerTimerEx;
    private Timer _ShrinkTimer;
    private Timer _redisTimer;
    private Timer _searchFormTimer;


    IHttpContextAccessor httpContextAccessor = new HttpContextAccessor();

    public TimedHostedOldService(
        ILogger<TimedHostedService> logger,
        IWebHostEnvironment hostingEnvironment,
        IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        _scopeFactory = scopeFactory ?? throw new ArgumentNullException(nameof(scopeFactory));
    }



    public Task StartAsync(CancellationToken cancellationToken)
    {

        //_triggerTimerEx = new Timer(RunTriggerProecssExcel, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
         
        _redisTimer = new Timer(GetData_Redis, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));

        //_searchFormTimer = new Timer(GetDataSearchForm, null, TimeSpan.Zero, TimeSpan.FromSeconds(2));

        //_SystemTimer = new Timer(_System, null, TimeSpan.Zero, TimeSpan.FromSeconds(400));
        // تشغيل GetData_Redis كل 3 ثانية 
        _triggerTimer = new Timer(RunTrigger, null, TimeSpan.Zero, TimeSpan.FromSeconds(2000));

        return Task.CompletedTask;
    }


    private void GetDataSearchForm(object state)
    {
        if (ConnectionString.FlageRun == "1")
        {
            return;
        }

        try
        {
            // Set flag to prevent re-entry
            ConnectionString.FlageRun = "1";

            // Assuming ModelDbContext is properly set up
            using (var dbContext = new ModelDbContext())
            {
                // Initialize the CustomSearchGrid with the dbContext
                var customSearchGrid = new CustomSearchGrid(dbContext, _hostingEnvironment);

                // Call the GetDataAllSearchForms method
                customSearchGrid.GetDataAllSearchForms(_hostingEnvironment);
            }
        }
        catch (Exception ex)
        {
            // Log the error
            Console.WriteLine($"Error in GetDataSearchForm: {ex.Message}");
        }
        finally
        {
            // Reset the flag
            ConnectionString.FlageRun = "";
        }
    }

    private void GetData_Redis(object state)
    {
        if (ConnectionString.FlageRun_Redis == "1")
        {
            return;
        }

        try
        {
            // Set flag to prevent re-entry
            ConnectionString.FlageRun_Redis = "1";

            // Assuming ModelDbContext is properly set up
            using (var scope = _scopeFactory.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ModelDbContext>();
                var deviceIdProvider = scope.ServiceProvider.GetRequiredService<DeviceIdProvider>();

                var data_Redis = new Data_Redis(dbContext, _hostingEnvironment, deviceIdProvider);


                data_Redis.GetData_RedisAllTables(_hostingEnvironment);
            }
        }
        catch (Exception ex)
        {
            // Log the error
            Console.WriteLine($"Error in GetDataSearchForm: {ex.Message}");
        }
        finally
        {
            // Reset the flag
            ConnectionString.FlageRun_Redis = "";
        }
    }

    private void RunTrigger(object state)
    {
        _logger.LogInformation("Running Trigger at: {time}", DateTimeOffset.Now);

        var query = "EXEC TS_G_Run_Job_Trigger";
        ExecuteSqlRaw(query);
    }

    
    private void RunTriggerProecssExcel(object state)
    {
        _logger.LogInformation("Running Trigger ProecssExcel at: {time}", DateTimeOffset.Now);

        var query = "EXEC TS_Run_Trigger_ProecssExcel";
        ExecuteSqlRaw(query);
    }



    private void _System(object state)
    {
        //ISystemService _webSystemService = new ISystemService(new SystemService(httpContextAccessor));
    }


    private int ExecuteSqlRaw(string query)
    {
        int rowsAffected = 0;
        string connectionString = ConnectionString.connectionString;

        try
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    rowsAffected = cmd.ExecuteNonQuery();
                }
            }
        }
        catch (Exception ex)
        {
            // التعامل مع الخطأ
            _logger.LogError(ex, "Error executing SQL query.");
        }

        return rowsAffected;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Timed Background Service is stopping.");

        _SystemTimer?.Change(Timeout.Infinite, 0);
        _ShrinkTimer?.Change(Timeout.Infinite, 0);
        _triggerTimer?.Change(Timeout.Infinite, 0);
        _triggerTimerEx?.Change(Timeout.Infinite, 0);
        _redisTimer?.Change(Timeout.Infinite, 0);
        _searchFormTimer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _SystemTimer?.Dispose();
        _ShrinkTimer?.Dispose();
        _triggerTimer?.Dispose();
        _triggerTimerEx?.Dispose();
        _redisTimer?.Dispose();
        _searchFormTimer?.Dispose();
    }
}
