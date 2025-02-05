using ImageMagick;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace IdentityProvider.Services;

public class MsGraphDelegatedService
{
    private readonly ITokenAcquisition _tokenAcquisition;

    public MsGraphDelegatedService(ITokenAcquisition tokenAcquisition)
    {
        _tokenAcquisition = tokenAcquisition;
    }

    public async Task<string> GetPhotoAsync(ClaimsPrincipal claimsPrincipal)
    {
        var photo = string.Empty;
        byte[] photoByte;

        try
        {
            var client = new HttpClient();
            var baseAddress = "https://graph.microsoft.com/v1.0";

            var accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(["User.Read"],
                user: claimsPrincipal,
                authenticationScheme: "EntraID");

            client.BaseAddress = new Uri(baseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await client.GetAsync($"https://graph.microsoft.com/v1.0/me/photo/$value");

            if (response.IsSuccessStatusCode)
            {
                photoByte = await response.Content.ReadAsByteArrayAsync();

                using var imageFromFile = new MagickImage(photoByte);
                // Sets the output format to jpeg
                imageFromFile.Format = MagickFormat.Jpeg;
                var size = new MagickGeometry(400, 400);

                // This will resize the image to a fixed size without maintaining the aspect ratio.
                // Normally an image will be resized to fit inside the specified size.
                //size.IgnoreAspectRatio = true;

                imageFromFile.Resize(size);

                // Create byte array that contains a jpeg file
                var data = imageFromFile.ToByteArray();
                photo = Base64UrlEncoder.Encode(data);

                return photo;
            }

            throw new ApplicationException($"Status code: {response.StatusCode}, Error: {response.ReasonPhrase}");
        }
        catch (Exception e)
        {
            throw new ApplicationException($"Exception {e}");
        }
    }

    public string GetOid(IEnumerable<Claim> claims)
    {
        // oid if magic MS namespaces not user
        var oid = claims.FirstOrDefault(t => t.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier");

        if (oid != null)
        {
            return oid.Value;
        }

        oid = claims.FirstOrDefault(t => t.Type == "oid");

        if (oid != null)
        {
            return oid.Value;
        }

        return string.Empty;
    }
}