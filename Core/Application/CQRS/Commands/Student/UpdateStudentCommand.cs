using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Commands
{
    public class UpdateStudentCommand : IRequest<int>
    {
        public int studentId { get; set; }
        public string Name { get; set; }
        public string studyField { get; set; }
        public int Rank { get; set; }

        public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand, int>
        {
            private readonly IAppDbContext context;
            public UpdateStudentCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(UpdateStudentCommand command, CancellationToken cancellationToken)
            {
                var student = context.Students.Where(a => a.studentId == command.studentId).FirstOrDefault();

                if (student == null)
                    return default;

                student.Name = command.Name;
                student.studyField = command.studyField;
                student.Rank = command.Rank;
                await context.SaveChangesAsync();
                return student.studentId;
            }
        }
    }
}
