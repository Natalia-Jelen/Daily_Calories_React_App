using System;
using System.Collections.Generic;

namespace WebAppReact.Models
{
    public partial class UserStats
    {
        public int UserStatsId { get; set; }
        public DateTime RegisterDate { get; set; }
        public double Weight { get; set; }
        public double Goal { get; set; }
        public string ApplicationUserId { get; set; }
    }
}
