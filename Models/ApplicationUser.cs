using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppReact.Models;

namespace WebAppReact.Models
{
    public class ApplicationUser : IdentityUser
    {
        public UsersData UsersData { get; set; }
    }
}
