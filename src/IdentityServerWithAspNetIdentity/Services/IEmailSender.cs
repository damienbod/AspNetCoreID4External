using System.Threading.Tasks;

namespace IdentityServerWithAspNetIdentity.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
