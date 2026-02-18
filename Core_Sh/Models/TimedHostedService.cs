using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Core;

public class TimedHostedService : BackgroundService
{
    private readonly ILogger<TimedHostedService> _logger;

    public TimedHostedService(ILogger<TimedHostedService> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("TimedHostedService started.");

        // ⏱️ Delay بعد تشغيل السيرفر
        await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunTriggerAsync(stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // طبيعي وقت إيقاف السيرفر
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error running server import job");
            }

            // ⏱️ كل 3 ساعات
            await Task.Delay(TimeSpan.FromHours(3), stoppingToken);
        }
    }

    private async Task RunTriggerAsync(CancellationToken stoppingToken)
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Import Job started at {time}", DateTime.Now);

        await using var con = new SqlConnection(ConnectionString.connectionString);
        await con.OpenAsync(stoppingToken);

        // 🔒 Application Lock (نستنى شوية بدل 0)
        await using (var lockCmd = new SqlCommand("sp_getapplock", con))
        {
            lockCmd.CommandType = CommandType.StoredProcedure;
            lockCmd.Parameters.AddWithValue("@Resource", "IMPORT_JOB");
            lockCmd.Parameters.AddWithValue("@LockMode", "Exclusive");
            lockCmd.Parameters.AddWithValue("@LockOwner", "Session");
            lockCmd.Parameters.AddWithValue("@LockTimeout", 5000); // ⬅️ 5 ثواني

            var returnParam = new SqlParameter
            {
                ParameterName = "@RETURN_VALUE",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.ReturnValue
            };
            lockCmd.Parameters.Add(returnParam);

            await lockCmd.ExecuteNonQueryAsync(stoppingToken);

            int lockResult = (int)returnParam.Value;
            if (lockResult < 0)
            {
                _logger.LogWarning("Import Job already running. LockResult={result}", lockResult);
                return;
            }
        }

        try
        {
            await using var cmd = new SqlCommand("TS_G_Run_Job_Trigger", con);
            cmd.CommandType = CommandType.StoredProcedure;

            // ⛔ ممنوع 0 (انتظار للأبد)
            cmd.CommandTimeout = 300; // ⏱️ 5 دقائق

            await cmd.ExecuteNonQueryAsync(stoppingToken);
        }
        catch (SqlException ex)
        {
            _logger.LogError(ex, "SQL Error while running import job");
            throw;
        }
        finally
        {
            // 🔓 Release Lock (مهم جدًا)
            await using var unlockCmd = new SqlCommand("sp_releaseapplock", con);
            unlockCmd.CommandType = CommandType.StoredProcedure;
            unlockCmd.Parameters.AddWithValue("@Resource", "IMPORT_JOB");
            unlockCmd.Parameters.AddWithValue("@LockOwner", "Session");
            await unlockCmd.ExecuteNonQueryAsync(stoppingToken);
        }

        sw.Stop();
        _logger.LogInformation(
            "Import Job finished at {time} (Duration: {sec} sec)",
            DateTime.Now,
            sw.Elapsed.TotalSeconds
        );
    }
}
