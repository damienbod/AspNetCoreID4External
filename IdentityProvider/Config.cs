using Duende.IdentityServer.Models;

namespace IdentityProvider;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("dataEventRecords", "Scope for the dataEventRecords")
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new ApiResource[]
        {
            new ApiResource("dataEventRecordsApi")
            {
                ApiSecrets = { new Secret("dataEventRecordsSecret".Sha256()) },
                Scopes = { "dataEventRecords" },
                UserClaims = { "role", "admin", "user", "dataEventRecords", "dataEventRecords.admin", "dataEventRecords.user" }
            }
        };

    public static IEnumerable<Client> Clients => new Client[]
    {
        new Client
            {
                ClientName = "angularclient",
                ClientId = "angularclient",
                AccessTokenType = AccessTokenType.Reference,
                AccessTokenLifetime = 330,// 120 seconds, default 60 minutes
                IdentityTokenLifetime = 300,

                RequireClientSecret = false,
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,

                AllowAccessTokensViaBrowser = true,
                RedirectUris = new List<string>
                {
                    "https://localhost:4200"

                },
                PostLogoutRedirectUris = new List<string>
                {
                    "https://localhost:4200",
                    "https://localhost:4200/unauthorized"
                },
                AllowedCorsOrigins = new List<string>
                {
                    "https://localhost:4200"
                },
                AllowedScopes = new List<string>
                {
                    "openid",
                    "dataEventRecords",
                    "role",
                    "profile",
                    "email"
                }
            }
    };
}