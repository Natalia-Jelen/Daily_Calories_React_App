using System;
using System.Collections.Generic;
using WebAppReact.Models;

namespace WebAppReact.Models
{
    public partial class UsersData
    {
        public int UserDataId { get; set; }
        public string Name { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int SexId { get; set; }
        public int ActivityId { get; set; }
        public double Goal { get; set; }

        public virtual Activities Activity { get; set; }
        public virtual Sexs Sex { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
