using GameReviewer.DataAccess.GameDbContext;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add the DbContext to the DI container
        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
        {
            options.UseSqlServer(
                @"Server = (localdb)\MSSQLLocalDB; " +
                "Database = GameReviewerDBWebApp; " +
                "Trusted_Connection = True;");
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
