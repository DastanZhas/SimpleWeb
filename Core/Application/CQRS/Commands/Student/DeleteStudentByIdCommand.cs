﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Commands
{
    public class DeleteStudentByIdCommand : IRequest<int>
    {
        public int studentId { get; set; }
        public class DeleteStudentByIdCommandHandler : IRequestHandler<DeleteStudentByIdCommand, int>
        {
            private readonly IAppDbContext context;
            public DeleteStudentByIdCommandHandler(IAppDbContext context)
            {
                this.context = context;
            }
            public async Task<int> Handle(DeleteStudentByIdCommand command, CancellationToken cancellationToken)
            {
                var student = await context.Students.Where(a => a.studentId == command.studentId).FirstOrDefaultAsync();
                if (student == null) return default;
                context.Students.Remove(student);
                await context.SaveChangesAsync();
                return student.studentId;
            }
        }
    }
}