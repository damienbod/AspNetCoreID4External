using ResourceServer.Model;
using ResourceServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using IdentityServer4.AccessTokenValidation;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ResourceServer;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        var connection = Configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<DataEventRecordContext>(options =>
            options.UseSqlite(connection)
        );

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder
                        .AllowCredentials()
                        .WithOrigins("https://localhost:4200")
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        var guestPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .RequireClaim("scope", "dataEventRecords")
            .Build();

        services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
          .AddIdentityServerAuthentication(options =>
          {
              options.Authority = "https://localhost:44337";
              options.ApiName = "dataEventRecordsApi";
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
                policyUser.RequireClaim("role", "dataEventRecords.user");
            });
        });

        services.AddControllers()
          .AddNewtonsoftJson();

        services.AddSwaggerGen(c =>
        {
            // add JWT Authentication
            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "JWT Authentication",
                Description = "Enter JWT Bearer token **_only_**",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer", // must be lower case
                BearerFormat = "JWT",
                Reference = new OpenApiReference
                {
                    Id = JwtBearerDefaults.AuthenticationScheme,
                    Type = ReferenceType.SecurityScheme
                }
            };
            c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {securityScheme, Array.Empty<string>()}
            });

            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "An API ",
                Version = "v1",
                Description = "An API",
                Contact = new OpenApiContact
                {
                    Name = "damienbod",
                    Email = string.Empty,
                    Url = new Uri("https://damienbod.com/"),
                },
            });
        });

        services.AddScoped<IDataEventRecordRepository, DataEventRecordRepository>();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseSecurityHeaders(
            SecurityHeadersDefinitions.GetHeaderPolicyCollection(true));

        app.UseExceptionHandler("/Home/Error");
        app.UseCors("AllowAllOrigins");
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
