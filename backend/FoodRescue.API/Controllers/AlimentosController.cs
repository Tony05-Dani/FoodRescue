
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

    private static string CalcularEstado(DateTime fechaVencimiento)
    {
        int dias = (fechaVencimiento.Date - DateTime.Today).Days;

        if (dias < 0)
        {
            return "No disponible";
        }

        if (dias <= 3)
        {
            return "Consumo prioritario";
        }

        return "Disponible";
    }

    private static bool ActualizarEstado(Alimento alimento)
    {
        string estadoCalculado =
            CalcularEstado(alimento.FechaVencimiento);

        if (alimento.Estado == estadoCalculado)
        {
            return false;
        }

        alimento.Estado = estadoCalculado;
        return true;
    }

    // GET: api/Alimentos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Alimento>>> GetAlimentos()
    {
        var alimentos = await _context.Alimentos.ToListAsync();
        bool huboCambios = false;

        foreach (var alimento in alimentos)
        {
            if (ActualizarEstado(alimento))
            {
                huboCambios = true;
            }
        }

        if (huboCambios)
        {
            await _context.SaveChangesAsync();
        }

        return alimentos;
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

        if (ActualizarEstado(alimento))
        {
            await _context.SaveChangesAsync();
        }

        return alimento;
    }

    // POST: api/Alimentos
    [HttpPost]
    public async Task<ActionResult<Alimento>> PostAlimento(
        Alimento alimento)
    {
        alimento.Estado =
            CalcularEstado(alimento.FechaVencimiento);

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
    public async Task<IActionResult> PutAlimento(
        int id,
        Alimento alimento)
    {
        if (id != alimento.Id)
        {
            return BadRequest();
        }

        alimento.Estado =
            CalcularEstado(alimento.FechaVencimiento);

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