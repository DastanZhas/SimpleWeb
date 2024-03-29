﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Student
    {
        [Key]
        public int studentId { get; set; }
        public ICollection<Course> Courses { get; set; }

        public string Name { get; set; }
        public string studyField { get; set; }
        public int Rank { get; set; }
    }
}
