using FoodRescue.API.Data;
using FoodRescue.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlimentosController : ControllerBase
{
    private readonly FoodRescueDbContext _context;

    public AlimentosController(FoodRescueDbContext context)
    {
        _context = context;
    }

    // GET: api/Alimentos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Alimento>>> GetAlimentos()
    {
        return await _context.Alimentos.ToListAsync();
    }

    // GET: api/Alimentos/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Alimento>> GetAlimento(int id)
    {
        var alimento = await _context.Alimentos.FindAsync(id);

        if (alimento == null)
        {
            return NotFound();
        }

        return alimento;
    }

    // POST: api/Alimentos
    [HttpPost]
    public async Task<ActionResult<Alimento>> PostAlimento(Alimento alimento)
    {
        _context.Alimentos.Add(alimento);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetAlimento),
            new { id = alimento.Id },
            alimento
        );
    }

    // PUT: api/Alimentos/1
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlimento(int id, Alimento alimento)
    {
        if (id != alimento.Id)
        {
            return BadRequest();
        }

        _context.Entry(alimento).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Alimentos/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlimento(int id)
    {
        var alimento = await _context.Alimentos.FindAsync(id);

        if (alimento == null)
        {
            return NotFound();
        }

        _context.Alimentos.Remove(alimento);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}