using System.ComponentModel.DataAnnotations;

namespace IdentityServerWithAspNetIdentity.Models.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
