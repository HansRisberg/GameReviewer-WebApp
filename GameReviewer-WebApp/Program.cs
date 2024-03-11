using GameReviewer.DataAccess;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;


internal class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        SeedData.Initialize();

        // Configure CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAny",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
            });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add the DbContext to the DI container
        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
        {
            options.UseSqlServer(
                @"Server=(localdb)\MSSQLLocalDB;" +
                "Database=GameReviewerDBWebApp;" +
                "Trusted_Connection=True;");
        });

        // Configure Identity
        builder.Services.AddDefaultIdentity<Reviewer>(options => options.SignIn.RequireConfirmedAccount = false)
            .AddEntityFrameworkStores<GameReviewerDbContext>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseCors("AllowAny");

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthentication(); // Add this line to enable authentication
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}
