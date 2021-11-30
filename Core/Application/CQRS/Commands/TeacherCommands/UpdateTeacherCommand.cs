using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace Application.CQRS.Commands.TeacherCommands
{
    public class UpdateTeacherCommand : IRequest<int>
    {
        public int teacherId { get; set; }
        public string teacherName { get; set; }
        public string teacherEmail { get; set; }
        public string teacherPhonenumber { get; set; }

        public class UpdateTeacherCommandHandler : IRequestHandler<UpdateTeacherCommand, int>
        {
            private readonly IAppDbContext context;

            public UpdateTeacherCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<int> Handle(UpdateTeacherCommand command, CancellationToken cancellationToken)
            {
                var teacher = context.Teachers.Where(a => a.teacherId == command.teacherId).FirstOrDefault();

                if (teacher == null)
                    return default;

                teacher.teacherName = command.teacherName;
                teacher.teacherEmail = command.teacherEmail;
                teacher.teacherPhonenumber = teacher.teacherPhonenumber;
                await context.SaveChangesAsync();
                return teacher.teacherId;
            }
        }
    }
}
