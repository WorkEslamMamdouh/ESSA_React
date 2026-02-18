using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using System.Globalization;
using Core.UI.Repository;
using Core.Shared.DataManager;

namespace Core.UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // =========================
            // Connection Strings
            // =========================
            ConnectionString.connectionString = Configuration.GetConnectionString("DefaultConnection");
            ConnectionString.CompanyEmail = Configuration.GetConnectionString("CompanyEmail");
            ConnectionString.CompanyPassEmail = Configuration.GetConnectionString("CompanyPassEmail");
            ConnectionString.Url_APITax = Configuration.GetConnectionString("Url_APITax");
            ConnectionString.PathSaveData = Configuration.GetConnectionString("DefaultPathSaveData");

             
            // =========================
            // EF Core (أهم جزء)
            // =========================
            services.AddDbContext<ModelDbContext>(options =>
            {
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection"),
                    sql =>
                    {
                        sql.CommandTimeout(60);
                        sql.EnableRetryOnFailure();
                    });

                // 🚀 تسريع كبير
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            // =========================
            // Localization
            // =========================
            services.AddLocalization(options => options.ResourcesPath = "Resources");

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var cultures = new[]
                {
                    new CultureInfo("ar"),
                    new CultureInfo("en")
                };

                options.DefaultRequestCulture = new RequestCulture("ar");
                options.SupportedCultures = cultures;
                options.SupportedUICultures = cultures;
            });

            // =========================
            // MVC
            // =========================
            services.AddControllersWithViews()
                .AddViewLocalization()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.MaxDepth = 32;
                });

            // =========================
            // Session (خفيف وسريع)
            // =========================
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(5);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.SameSite = SameSiteMode.Lax;
            });


            // =========================
            // Request size limits
            // =========================
            services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodySize = 200 * 1024 * 1024; // 200 MB
            });

            services.Configure<KestrelServerOptions>(options =>
            {
                options.Limits.MaxRequestBodySize = 200 * 1024 * 1024;
            });


            // تسجيل الخدمة الخلفية
            //services.AddHostedService<TimedHostedService>();
            // =========================
            // Services
            // =========================
            services.AddHttpContextAccessor();
            services.AddScoped<DataManager>();
            services.AddScoped<DeviceIdProvider>();
            services.AddScoped<EmailService>();

            IocConfigurator.RegisterServices(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // =========================
            // Security Headers
            // =========================
            app.Use(async (context, next) =>
            {
                var headers = context.Response.Headers;

                headers["X-Content-Type-Options"] = "nosniff";
                headers["X-Frame-Options"] = "DENY";
                headers["Referrer-Policy"] = "no-referrer";
                headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()";

                await next();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseSession();

            var locOptions = app.ApplicationServices.GetRequiredService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });





            // الكود اللي يشغل Insert أول ما السيرفر يبدأ
            //using (var scope = app.ApplicationServices.CreateScope())
            //{
            //    var deviceIdProvider = scope.ServiceProvider.GetRequiredService<DeviceIdProvider>();
            //    deviceIdProvider.TrackThisDevice();
            //}


        }
    }
}
