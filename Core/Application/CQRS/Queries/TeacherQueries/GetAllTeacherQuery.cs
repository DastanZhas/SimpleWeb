using Domain;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.CQRS.Queries.TeacherQueries
{
    public class GetAllTeacherQuery : IRequest<IEnumerable<Teacher>>
    {
        public class GetAllTeacherQueryHandler : IRequestHandler<GetAllTeacherQuery, IEnumerable<Teacher>>
        {
            private readonly IAppDbContext context;
            public GetAllTeacherQueryHandler(IAppDbContext context)
            {
                this.context = context;
            }

            public async Task<IEnumerable<Teacher>> Handle(GetAllTeacherQuery query, CancellationToken cancellationToken)
            {
                var teacherList = await context.Teachers.ToListAsync();

                if(teacherList == null)
                {
                    return null;
                }
                return teacherList.AsReadOnly();
            }
        }
    }
}
