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
    public class UsersDatasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersDatasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UsersDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersData>>> GetUsersData()
        {
            return await _context.UsersData.ToListAsync();
        }

        // GET: api/UsersDatas/5
        [HttpGet("{applicationUserId}")]
        public async Task<ActionResult<UsersData>> GetUsersData(string applicationUserId)
        {
            var usersData = await _context.UsersData.SingleOrDefaultAsync(userData => userData.ApplicationUserId == applicationUserId);

            if (usersData == null)
            {
                return NotFound();
            }

            return usersData;
        }

        // PUT: api/UsersDatas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersData(int id, UsersData usersData)
        {
            _context.Entry(usersData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersDataExists(id))
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

        // POST: api/UsersDatas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UsersData>> PostUsersData(UsersData usersData)
        {
            _context.UsersData.Add(usersData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsersData", new { id = usersData.UserDataId }, usersData);
        }

        // DELETE: api/UsersDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersData>> DeleteUsersData(int id)
        {
            var usersData = await _context.UsersData.FindAsync(id);
            if (usersData == null)
            {
                return NotFound();
            }

            _context.UsersData.Remove(usersData);
            await _context.SaveChangesAsync();

            return usersData;
        }

        private bool UsersDataExists(int id)
        {
            return _context.UsersData.Any(e => e.UserDataId == id);
        }
    }
}
