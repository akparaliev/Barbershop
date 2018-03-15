using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barbershop.Models.ViewModels
{
    public class VisitRequestModel
    {
        public int ServiceId { get; set; }
        public DateTime DateTime { get; set; }
        public string UserId { get;  set; }
    }
}
