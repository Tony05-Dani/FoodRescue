
using FoodRescue.API.Data;
using FoodRescue.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LotesController : ControllerBase
{
    private readonly FoodRescueDbContext _context;

    public LotesController(FoodRescueDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lote>>> GetLotes()
    {
        return await _context.Lotes
            .Include(l => l.Alimento)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Lote>> GetLote(int id)
    {
        var lote = await _context.Lotes
            .Include(l => l.Alimento)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (lote == null)
        {
            return NotFound();
        }

        return lote;
    }

    [HttpPost]
    public async Task<ActionResult<Lote>> PostLote(Lote lote)
    {
        var alimentoExiste = await _context.Alimentos
            .AnyAsync(a => a.Id == lote.AlimentoId);

        if (!alimentoExiste)
        {
            return BadRequest("El alimento seleccionado no existe.");
        }

        if (string.IsNullOrWhiteSpace(lote.CodigoLote))
        {
            return BadRequest("El código del lote es obligatorio.");
        }

        if (lote.Cantidad <= 0 || lote.PrecioUnitario < 0)
        {
            return BadRequest("La cantidad debe ser mayor que cero y el precio no puede ser negativo.");
        }

        var codigoExiste = await _context.Lotes
            .AnyAsync(l => l.CodigoLote == lote.CodigoLote);

        if (codigoExiste)
        {
            return BadRequest("Ya existe un lote con ese código.");
        }

        _context.Lotes.Add(lote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetLote),
            new { id = lote.Id },
            lote
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutLote(int id, Lote lote)
    {
        if (id != lote.Id)
        {
            return BadRequest();
        }

        var alimentoExiste = await _context.Alimentos
            .AnyAsync(a => a.Id == lote.AlimentoId);

        if (!alimentoExiste)
        {
            return BadRequest("El alimento seleccionado no existe.");
        }

        if (string.IsNullOrWhiteSpace(lote.CodigoLote) ||
            lote.Cantidad <= 0 ||
            lote.PrecioUnitario < 0)
        {
            return BadRequest("Revisa el código, la cantidad y el precio del lote.");
        }

        var codigoExiste = await _context.Lotes
            .AnyAsync(l => l.CodigoLote == lote.CodigoLote && l.Id != id);

        if (codigoExiste)
        {
            return BadRequest("Ya existe otro lote con ese código.");
        }

        _context.Entry(lote).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLote(int id)
    {
        var lote = await _context.Lotes.FindAsync(id);

        if (lote == null)
        {
            return NotFound();
        }

        _context.Lotes.Remove(lote);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}