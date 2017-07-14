using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace IdentityServerWithAspNetIdentity.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        private readonly ILogger<AuthMessageSender> _logger;
        private readonly IConfiguration _configuration;

        public AuthMessageSender(ILogger<AuthMessageSender> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public Task SendEmailAsync(string email, string subject, string message)
        {
            // Plug in your email service here to send an email.
            _logger.LogInformation("Email: {email}, Subject: {subject}, Message: {message}", email, subject, message);
            return Task.FromResult(0);
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            _logger.LogInformation("SMS: {number}, Message: {message}", number, message);
            var sid = _configuration["TwilioSid"];
            var token = _configuration["TwilioToken"];
            var from = _configuration["TwilioFrom"];
            TwilioClient.Init(sid, token);
            MessageResource.CreateAsync(new PhoneNumber(number),
                from: new PhoneNumber(from),
                body: message);
            return Task.FromResult(0);
        }
    }
}
