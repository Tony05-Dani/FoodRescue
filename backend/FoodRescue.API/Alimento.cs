namespace FoodRescue.API.Models;

public class Alimento
{
    public int Id { get; set; }

    public string Producto { get; set; } = string.Empty;

    public int Cantidad { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public string TipoAlimento { get; set; } = string.Empty;

    public string Estado { get; set; } = string.Empty;

    public string Responsable { get; set; } = string.Empty;
}