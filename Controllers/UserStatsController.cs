using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppReact.Data;
using WebAppReact.Models;

namespace WebAppReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserStatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserStatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserStats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserStats>>> GetUserStats()
        {
            return await _context.UserStats.ToListAsync();
        }

        // GET: api/UserStats/5
        [HttpGet("{applicationUserId}")]
        public async Task<ActionResult<IEnumerable<UserStats>>> GetUserStats(string applicationUserId)
        {
            var userStats = await _context.UserStats.Where(userStat => userStat.ApplicationUserId == applicationUserId).ToListAsync();

            if (userStats == null)
            {
                return NotFound();
            }

            return userStats;
        }

        // PUT: api/UserStats/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserStats(int id, UserStats userStats)
        {
            if (id != userStats.UserStatsId)
            {
                return BadRequest();
            }

            _context.Entry(userStats).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserStatsExists(id))
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

        // POST: api/UserStats
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserStats>> PostUserStats(UserStats userStats)
        {
            _context.UserStats.Add(userStats);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserStats", new { id = userStats.UserStatsId }, userStats);
        }

        // DELETE: api/UserStats/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserStats>> DeleteUserStats(int id)
        {
            var userStats = await _context.UserStats.FindAsync(id);
            if (userStats == null)
            {
                return NotFound();
            }

            _context.UserStats.Remove(userStats);
            await _context.SaveChangesAsync();

            return userStats;
        }

        private bool UserStatsExists(int id)
        {
            return _context.UserStats.Any(e => e.UserStatsId == id);
        }
    }
}
