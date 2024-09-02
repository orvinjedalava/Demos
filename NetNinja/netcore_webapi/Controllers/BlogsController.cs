using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using netcore_webapi.Authenitication.Basic.Attributes;
using netcore_webapi.Authentication.JwtBearer;
using netcore_webapi.Models;

namespace netcore_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController(BlogContext context) : ControllerBase
    {
        private readonly BlogContext _context = context;

        // GET: api/Blogs
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
        {
            return await _context.Blogs.ToListAsync();
        }

        // GET: api/BLogs/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<Blog>> GetBlog(long id)
        {
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        // POST: api/Blogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize]
        public async Task<ActionResult<TodoItem>> PostBLog(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, blog);
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteBlog(long id)
        {
            var todoItem = await _context.Blogs.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogExists(long id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
    }
}