using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppReact.Models;
using WebAppReact.Data;

namespace WebAppReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SexsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SexsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sexs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sexs>>> GetSexs()
        {
            return await _context.Sexs.ToListAsync();
        }

        // GET: api/Sexs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sexs>> GetSexs(int id)
        {
            var sexs = await _context.Sexs.FindAsync(id);

            if (sexs == null)
            {
                return NotFound();
            }

            return sexs;
        }

        // PUT: api/Sexs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSexs(int id, Sexs sexs)
        {
            if (id != sexs.SexId)
            {
                return BadRequest();
            }

            _context.Entry(sexs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SexsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sexs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sexs>> PostSexs(Sexs sexs)
        {
            _context.Sexs.Add(sexs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSexs", new { id = sexs.SexId }, sexs);
        }

        // DELETE: api/Sexs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sexs>> DeleteSexs(int id)
        {
            var sexs = await _context.Sexs.FindAsync(id);
            if (sexs == null)
            {
                return NotFound();
            }

            _context.Sexs.Remove(sexs);
            await _context.SaveChangesAsync();

            return sexs;
        }

        private bool SexsExists(int id)
        {
            return _context.Sexs.Any(e => e.SexId == id);
        }
    }
}
