using Fido2NetLib;
using IdentityProvider.Data;
using IdentityProvider.Services.Certificate;
using IdentityServerHost.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        builder.Services.AddSecurityHeaderPolicies()
           .SetPolicySelector((PolicySelectorContext ctx) =>
           {
               return SecurityHeadersDefinitions.GetHeaderPolicyCollection(true);
           });



        builder.Services.AddRazorPages();

        var x509Certificate2Certs = GetCertificates(builder.Environment, configuration)
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

        services.AddIdentity<ApplicationUser, IdentityRole>()
          .AddEntityFrameworkStores<ApplicationDbContext>()
          .AddDefaultTokenProviders()
          .AddDefaultUI()
          .AddTokenProvider<Fido2UserTwoFactorTokenProvider>("FIDO2");

        services.Configure<Fido2Configuration>(builder.Configuration.GetSection("fido2"));
        services.AddScoped<Fido2Store>();

        services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>,
           AdditionalUserClaimsPrincipalFactory>();

        // Adds a default in-memory implementation of IDistributedCache.
        services.AddDistributedMemoryCache();
        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(2);
            options.Cookie.HttpOnly = true;
            options.Cookie.SameSite = SameSiteMode.None;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        });

        var aadApp = configuration.GetSection("AadApp");
        services.AddOidcStateDataFormatterCache("AADandMicrosoft");

        services.AddAuthentication(options => // Application
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddOpenIdConnect("AADandMicrosoft", "AAD Login", options =>
        {
            //  https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
            options.ClientId = aadApp["ClientId"];
            options.ClientSecret = aadApp["ClientSecret"];
            options.Authority = aadApp["AuthorityUrl"];

            options.SignInScheme = "Identity.External";
            options.RemoteAuthenticationTimeout = TimeSpan.FromSeconds(20);
            options.ResponseType = "code";
            options.Scope.Add("profile");
            options.Scope.Add("email");
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false, // multi tenant => means all tenants can use this
                NameClaimType = "email",
            };
            options.CallbackPath = "/signin-oidc";
            options.Prompt = "select_account"; // login, consent select_account
        });

        ECDsaSecurityKey eCDsaSecurityKey = new(x509Certificate2Certs.ActiveCertificate.GetECDsaPrivateKey());

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

    public static WebApplication ConfigurePipeline(this WebApplication app, IWebHostEnvironment env)
    {
        app.UseSecurityHeaders();

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

        app.UseSession();

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