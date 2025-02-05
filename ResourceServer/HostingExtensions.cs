
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using NetEscapades.AspNetCore.SecurityHeaders.Infrastructure;
using ResourceServer.Model;
using ResourceServer.Repositories;

namespace ResourceServer;

internal static class HostingExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        builder.Services.AddSecurityHeaderPolicies()
            .SetPolicySelector((PolicySelectorContext ctx) =>
            {
                return SecurityHeadersDefinitions.GetHeaderPolicyCollection(true);
            });


        var connection = configuration.GetConnectionString("DefaultConnection");

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

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app, IWebHostEnvironment env)
    {
        app.UseSecurityHeaders();

        app.UseExceptionHandler("/Home/Error");
        app.UseCors("AllowAllOrigins");
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Docs API");
        });



        return app;
    }
}