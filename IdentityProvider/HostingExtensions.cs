using IdentityProvider.Data;
using IdentityProvider.Models;
using IdentityProvider.Services;
using IdentityProvider.Services.Certificate;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NetEscapades.AspNetCore.SecurityHeaders.Infrastructure;
using Serilog;
using System.Security.Cryptography.X509Certificates;

namespace IdentityProvider;

internal static class HostingExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;

        builder.Services.AddRazorPages();
        builder.Services.AddScoped<MsGraphDelegatedService>();

        builder.Services.AddSecurityHeaderPolicies()
         .SetPolicySelector((PolicySelectorContext ctx) =>
         {
             // Weakened security headers for IDP callback
             if (ctx.HttpContext.Request.Path.StartsWithSegments("/connect"))
             {
                 return SecurityHeadersDefinitionsWeakened.GetHeaderPolicyCollection(
                     builder.Environment.IsDevelopment(),
                     builder.Configuration["AzureAd:Instance"]);
             }

             return SecurityHeadersDefinitions.GetHeaderPolicyCollection(
                 builder.Environment.IsDevelopment(),
                 builder.Configuration["AzureAd:Instance"]);
         });

        var (ActiveCertificate, SecondaryCertificate) = GetCertificates(builder.Environment, configuration)
          .GetAwaiter().GetResult();

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder
                        .AllowCredentials()
                        .WithOrigins(
                            "https://localhost:4200",
                            "https://localhost:5001")
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        // Add this if you need to add email support
        //services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
        //services.AddTransient<IEmailSender, EmailSender>();

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>,
           AdditionalUserClaimsPrincipalFactory>();

        builder.Services.AddDistributedMemoryCache();

        builder.Services.AddAuthentication()
            .AddMicrosoftIdentityWebApp(options =>
            {
                builder.Configuration.Bind("AzureAd", options);
                options.SignInScheme = "entraidcookie";
                options.UsePkce = true;
                options.Events = new OpenIdConnectEvents
                {
                    OnTokenResponseReceived = context =>
                    {
                        var idToken = context.TokenEndpointResponse.IdToken;
                        return Task.CompletedTask;
                    }
                };
            }, copt => { }, "EntraID", "entraidcookie", false, "Entra ID")
            .EnableTokenAcquisitionToCallDownstreamApi(["User.Read"])
            .AddMicrosoftGraph()
            .AddDistributedTokenCaches();

        ECDsaSecurityKey eCDsaSecurityKey = new(ActiveCertificate.GetECDsaPrivateKey());

        services.AddIdentityServer(options =>
        {
            options.Events.RaiseErrorEvents = true;
            options.Events.RaiseInformationEvents = true;
            options.Events.RaiseFailureEvents = true;
            options.Events.RaiseSuccessEvents = true;
            options.UserInteraction.LoginUrl = "/Identity/Account/Login";
            options.UserInteraction.LogoutUrl = "/Identity/Account/Logout";

            // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
            options.EmitStaticAudienceClaim = true;
        })
        .AddSigningCredential(eCDsaSecurityKey, "ES384") // ecdsaCertificate
        .AddInMemoryIdentityResources(Config.IdentityResources)
        .AddInMemoryApiScopes(Config.ApiScopes)
        .AddInMemoryClients(Config.Clients)
        .AddInMemoryApiResources(Config.ApiResources)
        .AddAspNetIdentity<ApplicationUser>()
        .AddProfileService<IdentityWithAdditionalClaimsProfileService>();

        services.AddAuthentication();

        services.AddSingleton<IAuthorizationHandler, IsAdminHandler>();
        services.AddAuthorization(options =>
        {
            options.AddPolicy("IsAdmin", policyIsAdminRequirement =>
            {
                policyIsAdminRequirement.Requirements.Add(new IsAdminRequirement());
            });
        });

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        app.UseSecurityHeaders();

        IdentityModelEventSource.ShowPII = true;

        app.UseSerilogRequestLogging();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors("AllowAllOrigins");

        app.MapStaticAssets();
        app.UseRouting();
        app.UseIdentityServer();
        app.UseAuthorization();

        app.MapRazorPages().RequireAuthorization();
        app.MapControllers();

        return app;
    }

    private static async Task<(X509Certificate2 ActiveCertificate, X509Certificate2 SecondaryCertificate)> GetCertificates(IWebHostEnvironment environment, IConfiguration configuration)
    {
        var certificateConfiguration = new CertificateConfiguration
        {
            // Use an Azure key vault
            CertificateNameKeyVault = configuration["CertificateNameKeyVault"], //"StsCert",
            KeyVaultEndpoint = configuration["AzureKeyVaultEndpoint"], // "https://damienbod.vault.azure.net"

            // Use a local store with thumbprint
            //UseLocalCertStore = Convert.ToBoolean(configuration["UseLocalCertStore"]),
            //CertificateThumbprint = configuration["CertificateThumbprint"],

            // development certificate
            DevelopmentCertificatePfx = Path.Combine(environment.ContentRootPath, "cert_ecdsa384.pfx"),
            DevelopmentCertificatePassword = "1234" //configuration["DevelopmentCertificatePassword"] //"1234",
        };

        (X509Certificate2 ActiveCertificate, X509Certificate2 SecondaryCertificate) certs = await CertificateService.GetCertificates(
            certificateConfiguration).ConfigureAwait(false);

        return certs;
    }

}