using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barbershop.Models.ViewModels
{
    public class VisitViewModel
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public bool IsFutureVisit {get;set;}
        public string ServiceName { get; set; }
        public bool IsCancelled { get; set; }
    }
}
