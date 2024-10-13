
[![.NET](https://github.com/damienbod/AspNetCoreID4External/actions/workflows/dotnet.yml/badge.svg)](https://github.com/damienbod/AspNetCoreID4External/actions/workflows/dotnet.yml)

## OIDC setup for external IDP

```csharp
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
```

## Blogs

### Old

[Updating Microsoft Account Logins in ASP.NET Core with OpenID Connect and Azure Active Directory](https://damienbod.com/2019/05/17/updating-microsoft-account-logins-in-asp-net-core-with-openid-connect-and-azure-active-directory/)

## History 

- 2024-10-13 Updated packages
- 2023-03-12 Updated packages
- 2023-01-29 Updated identity provider
- 2023-01-28 Updated packages .NET 7 and others
- 2022-01-28 Updated packages
- 2021-11-12 Updated .NET 6, Angular 13
- 2021-07-01 Updated OIDC npm
- 2021-03-17 Updated packages
- 2020-12-06 Update to .NET 5, Using only Angular CLI
- 2020-07-11 Added Angular CLI client using refresh tokens
- 2020-07-05 Updated all npm, nuget packages
- 2020-05-06 Updated FIDO2, switched to refresh tokens, using EC certificate
- 2020-05-03 Updated OIDC lib to version 11, nuget packages
- 2020-03-03 Added support for FIDO2, updated to Angular 9
- 2020-01-04 Updated nuget packages, same site fix
- 2019-12-13 Updated to .NET Core 3.1, Angular 8.2.14
- 2019-10-07 Updated to .NET Core 3.0, Angular 8.2.9
- 2019-05-30 Updated to Angular 8.0.0
- 2019-05-15 Switched to OIDC code flow with PKCE, updated to Angular 7.2.15
- 2019-05-14 Updated Microsoft login to OIDC login, updated STS
- 2019-03-31 Updated to Angular 7.2.11, NuGet packages
- 2019-02-07 Updated to Angular 7.2.4, ASP.NET Core 2.2
- 2018-10-28 Updated to Angular 7.0.0, ASP.NET Core 2.1
- 2018-05-27 Updated packages
- 2018-05-08 Updated to .NET Core 2.1 rc1
- 2018-05-04 Updated to Angular 6
- 2018-05-01 Updated to bootstrap 4, switch to Authenticator
- 2018-05-01 Updated Identity to use 2FA with TOTP, Angular 5.2.10, angular-auth-oidc-client 4.1.0
- 2018-02-03 Updated npm and nuget packages, Angular 5.2.3, angular-auth-oidc-client 4.0.1
- 2017-11-05 Updated to Angular 5 and Typescript 2.6.1
- 2017-09-23 Updated to ASP.NET Core 2.0

## Even older blogs

### Adding an external Microsoft login to IdentityServer4

https://damienbod.com/2017/07/11/adding-an-external-microsoft-login-to-identityserver4/

### Implementing Two-factor authentication with IdentityServer4 and Twilio

#### This is no longer recommended, removed from code. See history

https://damienbod.com/2017/07/14/implementing-two-factor-authentication-with-identityserver4-and-twilio/

