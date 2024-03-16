using GameReviewer.DataAccess;
using GameReviewer.DataAccess.Authentication;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.EntityFrameworkCore;


internal class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        SeedData.Initialize();

        // Configure CORS
        builder.Services.AddCors(options => {
            options.AddPolicy("AllowAny",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });

        builder.Services.AddControllers()
            .AddJsonOptions(options => {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
            });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add the DbContext to the DI container
        builder.Services.AddDbContext<GameReviewerDbContext>(options => {
            options.UseSqlServer(
                @"Server=(localdb)\MSSQLLocalDB;" +
                "Database=GameReviewerDBWebApp;" +
                "Trusted_Connection=True;");
        });

        // Configure Identity
        builder.Services.AddDefaultIdentity<Reviewer>(options => options.SignIn.RequireConfirmedAccount = false)
            .AddEntityFrameworkStores<GameReviewerDbContext>();

        // Retrieve jwtSecret from configuration
        var jwtSecret = builder.Configuration.GetSection("Jwt")["SecretKey"];

        // Register JwtTokenGenerator with jwtSecret value
        builder.Services.AddScoped<JwtTokenGenerator>(_ => new JwtTokenGenerator(builder.Configuration));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseCors("AllowAny");

        if (app.Environment.IsDevelopment()) {
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
