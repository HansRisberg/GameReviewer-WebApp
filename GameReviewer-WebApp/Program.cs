using GameReviewer.DataAccess.GameDbContext;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

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

        // Apply pending migrations
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                var dbContext = services.GetRequiredService<GameReviewerDbContext>();
                dbContext.Database.Migrate();
            }
            catch (Exception ex)
            {
                // Handle exception as needed
                Console.WriteLine(ex.Message);
            }
        }

        app.MapControllers();

        app.Run();
    }
}
