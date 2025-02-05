using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityProvider.Pages.Account;

[AllowAnonymous]
public class ResetPasswordConfirmationModel : PageModel
{
    public void OnGet()
    {

    }
}
