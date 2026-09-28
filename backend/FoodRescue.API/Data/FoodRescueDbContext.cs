using FoodRescue.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue.API.Data;

public class FoodRescueDbContext : DbContext
{
    public FoodRescueDbContext(DbContextOptions<FoodRescueDbContext> options)
        : base(options)
    {
    }

    public DbSet<Alimento> Alimentos { get; set; }
}