using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Barbershop.Models.DataModels;
using Barbershop.Models.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Barbershop.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ServiceController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public ServiceController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: api/Service
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var serviceRepo = _unitOfWork.GetRepository<Service>();
            var services= serviceRepo.GetAll().Where(x=>!x.IsDeleted).ToList();
            return new JsonResult(services);
        }

        
        // POST: api/Service
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ServiceRequestModel service)
        {
            var serviceRepo = _unitOfWork.GetRepository<Service>();
             serviceRepo.Insert(new Service() { Name = service.Name,IsDeleted=false });
            await _unitOfWork.SaveChangesAsync();
            return new OkResult();
        }
        
        // PUT: api/Service/5
        [HttpPut()]
        public void Put([FromBody]ServiceRequestModel service)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var serviceRepo = _unitOfWork.GetRepository<Service>();
            var find = serviceRepo.Find(id);
            find.IsDeleted = true;
            serviceRepo.Update(find);
            await _unitOfWork.SaveChangesAsync();
            return new OkResult();
        }
    }
}
