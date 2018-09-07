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
    [Route("properties")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly EntityContext m_entityContext;

        public PropertiesController(EntityContext entityContext)
        {
            m_entityContext = entityContext;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<Property>>> Get()
        {
            return await m_entityContext.Properties
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> Get(int id)
        {
            return await m_entityContext.Properties
                .Where(property => property.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Property property)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Add(property);
            await m_entityContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), property);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Property property)
        {
            if (id != property.Id)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Update(property);
            await m_entityContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var property = await m_entityContext.Properties
                .Where(_property => _property.Id == id)
                .FirstOrDefaultAsync();

            if (property == null)
                return NotFound();

            m_entityContext.Remove(property);
            await m_entityContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
