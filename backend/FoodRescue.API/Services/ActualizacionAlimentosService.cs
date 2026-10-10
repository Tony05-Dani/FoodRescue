
using FoodRescue.API.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.API.Services;

public class ActualizacionAlimentosService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<ActualizacionAlimentosService> _logger;

    public ActualizacionAlimentosService(
        IServiceScopeFactory scopeFactory,
        ILogger<ActualizacionAlimentosService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();

                var context = scope.ServiceProvider
                    .GetRequiredService<FoodRescueDbContext>();

                var alimentos = await context.Alimentos
                    .ToListAsync(stoppingToken);

                foreach (var alimento in alimentos)
                {
                    int dias = (
                        alimento.FechaVencimiento.Date -
                        DateTime.Today
                    ).Days;

                    if (dias < 0)
                    {
                        alimento.Estado = "No disponible";
                    }
                    else if (dias <= 3)
                    {
                        alimento.Estado = "Consumo prioritario";
                    }
                    else
                    {
                        alimento.Estado = "Disponible";
                    }
                }

                await context.SaveChangesAsync(stoppingToken);

                _logger.LogInformation(
                    "Estados de alimentos actualizados automáticamente.");
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error al actualizar los estados de los alimentos.");
            }

            await Task.Delay(
                TimeSpan.FromMinutes(1),
                stoppingToken);
        }
    }
}