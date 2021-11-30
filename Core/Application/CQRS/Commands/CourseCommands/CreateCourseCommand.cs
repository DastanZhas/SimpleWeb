using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.CQRS.Commands.CourseCommands
{
    public class CreateCourseCommand : IRequest<int>
    {
        public int teacherId { get; set; }
        public int studentId { get; set; }
        public string courseName { get; set; }
        public string courseDescription { get; set; }
        public int courseCredits { get; set; }

        public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, int>
        {
            private readonly IAppDbContext context;

            public CreateCourseCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(CreateCourseCommand command, CancellationToken cancellationToken)
            {
                var course = new Course();
                course.teacherId = command.teacherId;
                course.studentId = command.studentId;
                course.courseName = command.courseName;
                course.courseDescription = command.courseDescription;
                course.courseCredits = command.courseCredits;

                context.Courses.Add(course);
                await context.SaveChangesAsync();
                return course.courseId;
            }
        }
    }
}
