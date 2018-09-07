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
    [Route("languages")]
    [ApiController]
    public class LanguagesController : ControllerBase
    {
        private readonly EntityContext m_entityContext;

        public LanguagesController(EntityContext entityContext)
        {
            m_entityContext = entityContext;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<Language>>> Get()
        {
            return await m_entityContext.Languages
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Language>> Get(int id)
        {
            return await m_entityContext.Languages
                .Where(language => language.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Language language)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Add(language);
            await m_entityContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), language);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Language language)
        {
            if (id != language.Id)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Update(language);
            await m_entityContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var language = await m_entityContext.Languages
                .Where(_language => _language.Id == id)
                .FirstOrDefaultAsync();

            if (language == null)
                return NotFound();

            m_entityContext.Remove(language);
            await m_entityContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
