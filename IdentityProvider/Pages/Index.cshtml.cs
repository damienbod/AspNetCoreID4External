// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.

using Duende.IdentityServer;
using Duende.IdentityServer.Extensions;
using IdentityProvider.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

namespace IdentityProvider.Pages.Home;

[AllowAnonymous]
public class Index : PageModel
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Index(UserManager<ApplicationUser> userManager, IdentityServerLicense? license = null)
    {
        License = license;
        _userManager = userManager;
    }

    public string Version
    {
        get => typeof(Duende.IdentityServer.Hosting.IdentityServerMiddleware).Assembly
            .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
            ?.InformationalVersion.Split('+').First()
            ?? "unavailable";
    }

    [BindProperty]
    public byte[] Photo { get; set; } = [];

    public IdentityServerLicense? License { get; }

    public async Task OnGetAsync()
    {
        if (User.IsAuthenticated())
        {
            var user = await _userManager.GetUserAsync(User);
            if (user != null && !string.IsNullOrEmpty(user.Photo))
            {
                Photo = Base64UrlEncoder.DecodeBytes(user.Photo);
            }
        }
    }
}
