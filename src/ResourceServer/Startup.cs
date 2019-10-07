using AspNet5SQLite.Model;
using AspNet5SQLite.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using Newtonsoft.Json.Serialization;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System;
using Swashbuckle.AspNetCore.Swagger;

namespace AspNet5SQLite
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        public IConfiguration Configuration { get; }

        private readonly IWebHostEnvironment _webHostEnvironment;

        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Configuration["Production:SqliteConnectionString"];
            var folderForKeyStore = Configuration["Production:KeyStoreFolderWhichIsBacked"];
          
            var cert = new X509Certificate2(Path.Combine(_env.ContentRootPath, "damienbodserver.pfx"), "");

            services.AddDbContext<DataEventRecordContext>(options =>
                options.UseSqlite(connection)
            );

            //Add Cors support to the service
            services.AddCors();

            var policy = new Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy();

            policy.Headers.Add("*");
            policy.Methods.Add("*");
            policy.Origins.Add("*");
            policy.SupportsCredentials = true;

            services.AddCors(x => x.AddPolicy("corsGlobalPolicy", policy));

            var guestPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "dataEventRecords")
                .Build();

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
              .AddIdentityServerAuthentication(options =>
              {
                  options.Authority = "https://localhost:44337/";
                  options.ApiName = "dataEventRecords";
                  options.ApiSecret = "dataEventRecordsSecret";
              });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("dataEventRecordsAdmin", policyAdmin =>
                {
                    policyAdmin.RequireClaim("role", "dataEventRecords.admin");
                });
                options.AddPolicy("dataEventRecordsUser", policyUser =>
                {
                    policyUser.RequireClaim("role",  "dataEventRecords.user");
                });
            });

             services.AddControllers()
                .AddNewtonsoftJson()
               .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Docs API",
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddScoped<IDataEventRecordRepository, DataEventRecordRepository>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseCors("corsGlobalPolicy");
            app.UseStaticFiles();

            app.UseRouting();
			
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Docs API");
            });
        }
    }
}
