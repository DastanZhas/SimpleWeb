using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Commands.TeacherCommands
{
    public class DeleteTeacherCommand : IRequest<int>
    {
        public int teacherId { get; set; }
        public class DeleteTeacherCommandHandler : IRequestHandler<DeleteTeacherCommand, int>
        {
            private readonly IAppDbContext context;
            public DeleteTeacherCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(DeleteTeacherCommand command, CancellationToken cancellationToken)
            {
                var teacher = await context.Teachers.Where(a => a.teacherId == command.teacherId).FirstOrDefaultAsync();

                if (teacher == null) return default;

                context.Teachers.Remove(teacher);
                await context.SaveChangesAsync();
                return teacher.teacherId;
            }
        }
    }
}
