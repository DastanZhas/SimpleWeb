using Application.CQRS.Commands.CourseCommands;
using Application.CQRS.Queries.CourseQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private IMediator mediator;
        public CourseController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCourseCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await mediator.Send(new GetAllCourseQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await mediator.Send(new GetCourseByIdQuery { courseId = id }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await mediator.Send(new DeleteCourseByIdCommand { courseId = id }));
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateCourseCommand command)
        {
            if(id != command.courseId)
            {
                return BadRequest();
            }
            return Ok(await mediator.Send(command));
        }
    }
}
