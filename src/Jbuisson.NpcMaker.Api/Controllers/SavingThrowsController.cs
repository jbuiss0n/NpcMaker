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
    [Route("saving-throws")]
    [ApiController]
    public class SavingThrowsController : ControllerBase
    {
        private readonly EntityContext m_entityContext;

        public SavingThrowsController(EntityContext entityContext)
        {
            m_entityContext = entityContext;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<SavingThrow>>> Get()
        {
            return await m_entityContext.SavingThrows
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SavingThrow>> Get(int id)
        {
            return await m_entityContext.SavingThrows
                .Where(savingThrow => savingThrow.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] SavingThrow savingThrow)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Add(savingThrow);
            await m_entityContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), savingThrow);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] SavingThrow savingThrow)
        {
            if (id != savingThrow.Id)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Update(savingThrow);
            await m_entityContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var savingThrow = await m_entityContext.SavingThrows
                .Where(_savingThrow => _savingThrow.Id == id)
                .FirstOrDefaultAsync();

            if (savingThrow == null)
                return NotFound();

            m_entityContext.Remove(savingThrow);
            await m_entityContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
