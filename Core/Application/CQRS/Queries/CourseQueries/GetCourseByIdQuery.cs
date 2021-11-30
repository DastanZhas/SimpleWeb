using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Queries.CourseQueries
{
    public class GetCourseByIdQuery : IRequest<Course>
    {
        public int courseId { get; set; }
        public class GetCourseByIdQueryHandler : IRequestHandler<GetCourseByIdQuery, Course>
        {
            private readonly IAppDbContext context;
            public GetCourseByIdQueryHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<Course> Handle(GetCourseByIdQuery query, CancellationToken cancellationToken)
            {
                var course = await context.Courses.Where(a => a.courseId == query.courseId).FirstOrDefaultAsync();
                if (course == null)
                {
                    return null;
                }
                return course;
            }
        }
    }
}
