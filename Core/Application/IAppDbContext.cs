using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public interface IAppDbContext
    {
        DbSet<Student> Students { get; set; }
        Task<int> SaveChangesAsync();
    }
}
