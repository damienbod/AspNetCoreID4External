﻿using System.ComponentModel.DataAnnotations;

namespace IdentityServerAspNetIdentity.Models;

public class AdminViewModel
{
    [Required]
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
    public string DataEventRecordsRole { get; set; }
    public string SecuredFilesRole { get; set; }
}
