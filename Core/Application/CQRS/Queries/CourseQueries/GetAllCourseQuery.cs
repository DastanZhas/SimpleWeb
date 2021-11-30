using Domain;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Application.CQRS.Queries.CourseQueries
{
    public class GetAllCourseQuery : IRequest<IEnumerable<Course>>
    {
        public class GetAllCourseQueryHandler : IRequestHandler<GetAllCourseQuery, IEnumerable<Course>>
        {
            private readonly IAppDbContext context;
            public GetAllCourseQueryHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<IEnumerable<Course>> Handle(GetAllCourseQuery query, CancellationToken cancellationToken)
            {
                var courseList = await context.Courses.ToListAsync();

                if(courseList == null)
                {
                    return null;
                }
                return courseList.AsReadOnly();
            }
        }
    }
}
