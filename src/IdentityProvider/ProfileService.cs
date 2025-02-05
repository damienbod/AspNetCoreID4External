using Duende.IdentityModel;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using System.Net.Mail;
using System.Security.Claims;

namespace IdentityProvider;

public class ProfileService : IProfileService
{
    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        // add actor claim if needed
        if (context.Subject.GetAuthenticationMethod() == OidcConstants.GrantTypes.TokenExchange)
        {
            var act = context.Subject.FindFirst(JwtClaimTypes.Actor);
            if (act != null)
            {
                context.IssuedClaims.Add(act);
            }
        }

        return Task.CompletedTask;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        context.IsActive = true;
        return Task.CompletedTask;
    }

    public static Guid? GetOid(IEnumerable<Claim> claims)
    {
        // oid if magic MS namespaces not user
        var oid = claims.FirstOrDefault(t => t.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier");

        if (oid != null)
        {
            return Guid.TryParse(oid.Value, out var oidGuid) ? oidGuid : null;
        }

        oid = claims.FirstOrDefault(t => t.Type == "oid");

        return Guid.TryParse(oid?.Value, out var oidGuid2) ? oidGuid2 : null;
    }

    public static Guid? GetUserTenantId(IEnumerable<Claim> claims)
    {
        // tid if magic MS namespaces not user
        var tid = claims.FirstOrDefault(t => t.Type == "http://schemas.microsoft.com/identity/claims/tenantid");

        if (tid != null)
        {
            return null;
        }

        tid = claims.FirstOrDefault(t => t.Type == "tid");

        return Guid.TryParse(tid?.Value, out var tenantId) ? tenantId : null;
    }

    public static string? GetEmail(IEnumerable<Claim> claims)
    {
        var email = claims.FirstOrDefault(t => t.Type == ClaimTypes.Email);

        if (email != null)
        {
            return email.Value;
        }

        email = claims.FirstOrDefault(t => t.Type == JwtClaimTypes.Email);

        if (email != null)
        {
            return email.Value;
        }

        email = claims.FirstOrDefault(t => t.Type == "preferred_username");

        if (email != null)
        {
            var isNameAndEmail = IsEmailValid(email.Value);
            if (isNameAndEmail)
            {
                return email.Value;
            }
        }

        return null;
    }

    public static bool IsEmailValid(string email)
    {
        if (!MailAddress.TryCreate(email, out var mailAddress))
            return false;

        // And if you want to be more strict:
        var hostParts = mailAddress.Host.Split('.');
        if (hostParts.Length == 1)
            return false; // No dot.
        if (hostParts.Any(p => p == string.Empty))
            return false; // Double dot.
        if (hostParts[^1].Length < 2)
            return false; // TLD only one letter.

        if (mailAddress.User.Contains(' '))
            return false;
        if (mailAddress.User.Split('.').Any(p => p == string.Empty))
            return false; // Double dot or dot at end of user part.

        return true;
    }
}