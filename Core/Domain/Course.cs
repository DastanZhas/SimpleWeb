using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Course
    {
        [Key]
        public int courseId { get; set; }

        public Teacher Teacher { get; set; }
        [ForeignKey("teacherId")]
        public int teacherId { get; set; }

        public Student Student { get; set; }
        [ForeignKey("studentId")]
        public int studentId { get; set; }


        public string courseName { get; set; }
        public string courseDescription { get; set; }
        public int courseCredits { get; set; }
    }
}
