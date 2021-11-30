using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Teacher
    {
        [Key]
        public int teacherId { get; set; }
        public ICollection<Course> Courses { get; set; }

        public string teacherName { get; set; }
        public string teacherEmail { get; set; }
        public string teacherPhonenumber { get; set; }
    }
}
