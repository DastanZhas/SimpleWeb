using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.CQRS.Commands.TeacherCommands
{
    public class CreateTeacherCommand : IRequest<int>
    {
        public string teacherName { get; set; }
        public string teacherEmail { get; set; }
        public string teacherPhonenumber { get; set; }

        public class CreateTeacherCommandHandler : IRequestHandler<CreateTeacherCommand, int>
        {
            private readonly IAppDbContext context;

            public CreateTeacherCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<int> Handle(CreateTeacherCommand command, CancellationToken cancellationToken)
            {
                var teacher = new Teacher();
                teacher.teacherName = command.teacherName;
                teacher.teacherEmail = command.teacherEmail;
                teacher.teacherPhonenumber = command.teacherPhonenumber;

                context.Teachers.Add(teacher);
                await context.SaveChangesAsync();
                return teacher.teacherId;
            }
        }
    }
}
