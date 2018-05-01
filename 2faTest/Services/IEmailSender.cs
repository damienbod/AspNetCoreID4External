using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2faTest.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
