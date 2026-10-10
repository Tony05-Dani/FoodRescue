
namespace FoodRescue.API.Models;

public class Lote
{
    public int Id { get; set; }

    public string CodigoLote { get; set; } = string.Empty;

    public int Cantidad { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public decimal PrecioUnitario { get; set; }

    public int AlimentoId { get; set; }

    public Alimento? Alimento { get; set; }
}