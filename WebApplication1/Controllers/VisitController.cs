using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Barbershop.Models.DataModels;
using Barbershop.Models.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Barbershop.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class VisitController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
 
        public VisitController(UserManager<User> userManager, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
          
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            var visitRepo = _unitOfWork.GetRepository<Visit>();
            var services = visitRepo.GetAll()
                .Where(x=>x.User.Id== userId && !x.Service.IsDeleted)
                    .OrderByDescending(x=>x.DateTime).Select(x=>new VisitViewModel() {
                        Id=x.Id,
                        DateTime =x.DateTime.ToLocalTime(),
                        IsFutureVisit = x.DateTime.ToLocalTime()>DateTime.Now,
                        ServiceName=x.Service.Name,
                        IsCancelled=x.IsCancelled
                    }).ToList();
            return new JsonResult(services);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]VisitRequestModel value)
        {
            var visitRepo = _unitOfWork.GetRepository<Visit>();
            var service= _unitOfWork.GetRepository<Service>().Find(value.ServiceId);
            var user = _unitOfWork.GetRepository<User>().Find(value.UserId);
     
            visitRepo.Insert(new Visit()
            {
                DateTime=value.DateTime,
                Service=service,
                User= user
            });
            await _unitOfWork.SaveChangesAsync();
            return new OkResult();
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> Put(int id)
        {
            var visitRepo = _unitOfWork.GetRepository<Visit>();
            var visit = visitRepo.Find(id);
            visit.IsCancelled = true;
            await _unitOfWork.SaveChangesAsync();
            return new OkResult();
        }

    }
}
