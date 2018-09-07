using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jbuisson.NpcMaker.Data.Entities;
using Jbuisson.NpcMaker.Data.EntityFramework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jbuisson.NpcMaker.Api.Controllers
{
    [Route("skills")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly EntityContext m_entityContext;

        public SkillsController(EntityContext entityContext)
        {
            m_entityContext = entityContext;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<Skill>>> Get()
        {
            return await m_entityContext.Skills
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> Get(int id)
        {
            return await m_entityContext.Skills
                .Where(skill => skill.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Skill skill)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Add(skill);
            await m_entityContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), skill);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Skill skill)
        {
            if (id != skill.Id)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Update(skill);
            await m_entityContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var skill = await m_entityContext.Skills
                .Where(_skill => _skill.Id == id)
                .FirstOrDefaultAsync();

            if (skill == null)
                return NotFound();

            m_entityContext.Remove(skill);
            await m_entityContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
