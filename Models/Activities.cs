using System;
using System.Collections.Generic;

namespace WebAppReact.Models
{
    public partial class Activities
    {
        public Activities()
        {
            UsersData = new HashSet<UsersData>();
        }

        public int ActivityId { get; set; }
        public double Pal { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UsersData> UsersData { get; set; }
    }
}
