using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace Application.CQRS.Commands.CourseCommands
{
    public class UpdateCourseCommand : IRequest<int>
    {
        public int courseId { get; set; }
        public int teacherId { get; set; }
        public int studentId { get; set; }
        public string courseName { get; set; }
        public string courseDescription { get; set; }
        public int courseCredits { get; set; }

        public class UpdateCourseCommandHandler : IRequestHandler<UpdateCourseCommand, int>
        {
            private readonly IAppDbContext context;

            public UpdateCourseCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(UpdateCourseCommand command, CancellationToken cancellationToken)
            {
                var course = context.Courses.Where(a => a.courseId == command.courseId).FirstOrDefault();

                if (course == null)
                    return default;

                course.teacherId = command.teacherId;
                course.studentId = command.studentId;
                course.courseName = command.courseName;
                course.courseDescription = command.courseDescription;
                course.courseCredits = command.courseCredits;
                await context.SaveChangesAsync();
                return course.courseId;
            }
        }
    }
}
