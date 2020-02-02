using System;
using System.Collections.Generic;

namespace WebAppReact.Models
{
    public partial class Sexs
    {
        public Sexs()
        {
            UsersData = new HashSet<UsersData>();  
        }

        public int SexId { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UsersData> UsersData { get; set; }
    }
}
