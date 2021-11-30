using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Queries.TeacherQueries
{
    public class GetTeacherByIdQuery : IRequest<Teacher>
    {
        public int teacherId { get; set; }
        public class GetTeacherByIdQueryHandler: IRequestHandler<GetTeacherByIdQuery, Teacher>
        {
            private readonly IAppDbContext context;
            public GetTeacherByIdQueryHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<Teacher> Handle(GetTeacherByIdQuery query, CancellationToken cancellationToken)
            {
                var teacher = await context.Teachers.Where(a => a.teacherId == query.teacherId).FirstOrDefaultAsync();
                if(teacher == null)
                {
                    return null;
                }
                return teacher;
            }
        }
    }
}
