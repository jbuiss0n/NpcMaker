using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Jbuisson.NpcMaker.Api.Extensions;
using Jbuisson.NpcMaker.Api.Models.Characters;
using Jbuisson.NpcMaker.Data.Entities;
using Jbuisson.NpcMaker.Data.EntityFramework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jbuisson.NpcMaker.Api.Controllers
{
    [Route("characters")]
    [ApiController]
    public class CharactersController : ControllerBase
    {
        private readonly EntityContext m_entityContext;

        public CharactersController(EntityContext entityContext)
        {
            m_entityContext = entityContext;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var characters = await CharacterQueryContext()
                .ToListAsync();

            return Ok(ToModel(characters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var result = await CharacterQueryContext()
                .Where(character => character.Id == id)
                .FirstOrDefaultAsync();

            return Ok(ToModel(result));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Character character)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Add(character);
            await m_entityContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), character);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Character character)
        {
            if (id != character.Id)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);

            m_entityContext.Update(character);
            await m_entityContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var character = await m_entityContext.Characters
                .Where(_character => _character.Id == id)
                .FirstOrDefaultAsync();

            if (character == null)
                return NotFound();

            m_entityContext.Remove(character);
            await m_entityContext.SaveChangesAsync();

            return NoContent();
        }

        private IQueryable<Character> CharacterQueryContext()
        {
            return m_entityContext.Characters
                .Include(character => character.Abilities)
                    .ThenInclude(ability => ability.Ability)
                .Include(character => character.Languages)
                    .ThenInclude(language => language.Language)
                .Include(character => character.Skills)
                    .ThenInclude(skill => skill.Skill)
                .Include(character => character.SavingThrows)
                    .ThenInclude(savingthrow => savingthrow.SavingThrow)
                .Include(character => character.Properties);
        }

        private static ICollection<CharacterModel> ToModel(ICollection<Character> characters)
        {
            return characters.Select(character => ToModel(character)).ToList();
        }

        private static CharacterModel ToModel(Character character)
        {
            var model = new CharacterModel
            {
                Name = character.Name,
                Description = character.Description,
                Race = character.Race,
                Gender = character.Gender.HasValue ? (character.Gender.Value ? "female" : "male") : null,
                ArmorClass = character.ArmorClass,
                HitPoints = character.HitPoints,
                Speed = character.Speed,
                Strength = character.Strength,
                Dexterity = character.Dexterity,
                Constitution = character.Constitution,
                Intelligence = character.Intelligence,
                Wisdom = character.Wisdom,
                Charisma = character.Charisma,
            };

            model.Languages = character.Languages.Convert(language => language.Language.Name);

            model.Skills = character.Skills.Convert(skill => new SkillModel
            {
                Name = skill.Skill.Name,
                Modifier = skill.Modifier
            });
            model.SavingThrows = character.SavingThrows.Convert(savingthrow => new SavingThrowModel
            {
                Name = savingthrow.SavingThrow.Name,
                Modifier = savingthrow.Modifier
            });
            model.Properties = character.Properties.Convert(property => new PropertyModel
            {
                Name = property.Name,
                Description = ParseContent(property.Description, character.FriendlyName ?? character.Name, character.Gender)
            });
            model.Abilities = character.Abilities.Convert(ability => new AbilityModel
            {
                Name = ability.Ability.Name,
                Description = ParseContent(ability.Ability.Description, character.FriendlyName ?? character.Name, character.Gender)
            });

            return model;
        }

        private static string ParseContent(string content, string target, bool? gender)
        {
            return content.Replace("%t", target)
                .RegexReplace("%f\\[(?<c>[^]]+)\\]", gender.HasValue && gender.Value ? "$1" : String.Empty)
                .RegexReplace("%m\\[(?<c>[^]]+)\\]", gender.HasValue && !gender.Value ? "$1" : String.Empty)
                .RegexReplace("%n\\[(?<c>[^]]+)\\]", !gender.HasValue ? "$1" : String.Empty);
        }
    }
}
