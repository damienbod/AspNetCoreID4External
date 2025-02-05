using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityProvider.Pages.Account;

[AllowAnonymous]
public class ForgotPasswordConfirmation : PageModel
{
    public void OnGet()
    {
    }
}
