using Barbershop.Models;
using Barbershop.Models.DataModels;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barbershop
{
    public class AppContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Service> Services { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public AppContext( DbContextOptions<AppContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
