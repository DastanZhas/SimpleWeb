using Application.CQRS.Commands.TeacherCommands;
using Application.CQRS.Queries.TeacherQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherController : ControllerBase
    {
        private IMediator mediator;
        public TeacherController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTeacherCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await mediator.Send(new GetAllTeacherQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await mediator.Send(new GetTeacherByIdQuery { teacherId = id }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await mediator.Send(new DeleteTeacherCommand { teacherId = id }));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateTeacherCommand command)
        {
            if(id != command.teacherId)
            {
                return BadRequest();
            }
            return Ok(await mediator.Send(command));
        }
    }
}
