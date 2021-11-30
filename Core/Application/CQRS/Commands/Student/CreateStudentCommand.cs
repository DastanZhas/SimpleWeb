using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.CQRS.Commands
{
    public class CreateStudentCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string studyField { get; set; }
        public int Rank { get; set; }

        public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand, int>
        {
            private readonly IAppDbContext context;
            public CreateStudentCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(CreateStudentCommand command, CancellationToken cancellationToken)
            {
                var student = new Student();
                student.Name = command.Name;
                student.studyField = command.studyField;
                student.Rank = command.Rank;

                context.Students.Add(student);
                await context.SaveChangesAsync();
                return student.studentId;
            }
        }
    }
}
