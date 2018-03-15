using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Barbershop.Models.DataModels
{
    public class Visit
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public bool IsCancelled { get; set; }
        [Required]
        public virtual User User { get; set; }
        [Required]
        public virtual Service Service { get; set; }
    }
}
