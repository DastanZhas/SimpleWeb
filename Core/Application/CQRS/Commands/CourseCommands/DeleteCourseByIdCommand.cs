using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Commands.CourseCommands
{
    public class DeleteCourseByIdCommand : IRequest<int>
    {
        public int courseId { get; set; }
        public class DeleteCourseByIdCommandHandler : IRequestHandler<DeleteCourseByIdCommand, int>
        {
            private readonly IAppDbContext context;
            public DeleteCourseByIdCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<int> Handle(DeleteCourseByIdCommand command, CancellationToken cancellationToken)
            {
                var course = await context.Courses.Where(a => a.courseId == command.courseId).FirstOrDefaultAsync();

                if (course == null) return default;
                context.Courses.Remove(course);
                await context.SaveChangesAsync();
                return course.courseId;
            }
        }
    }
}
