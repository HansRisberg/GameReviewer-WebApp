//using GameReviewer.DataAccess;
//using GameReviewer.DataAccess.GameDbContext;
//using Microsoft.EntityFrameworkCore;

//internal class Program
//{
//    public static void Main(string[] args)
//    {
//        var builder = WebApplication.CreateBuilder(args);

//        SeedData.Initialize();
//        // Add services to the container.
//        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
//        {
//            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//        });

//        // Configure CORS
//        builder.Services.AddCors(options =>
//        {
//            options.AddPolicy("AllowAny",
//                builder => builder
//                    .AllowAnyOrigin()
//                    .AllowAnyHeader()
//                    .AllowAnyMethod());
//        });

//        builder.Services.AddControllers();
//        builder.Services.AddEndpointsApiExplorer();
//        builder.Services.AddSwaggerGen();

//        // Add the DbContext to the DI container
//        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
//        {
//            options.UseSqlServer(
//                @"Server = (localdb)\MSSQLLocalDB; " +
//                "Database = GameReviewerDBWebApp; " +
//                "Trusted_Connection = True;");
//        });

//        var app = builder.Build();

//        // Configure the HTTP request pipeline.
//        app.UseCors("AllowAny");

//        if (app.Environment.IsDevelopment())
//        {
//            app.UseSwagger();
//            app.UseSwaggerUI();
//        }


//        app.UseHttpsRedirection();
//        app.UseAuthorization();
//        app.MapControllers();
//        app.Run();
//    }
//}
using GameReviewer.DataAccess;
using GameReviewer.DataAccess.GameDbContext;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

internal class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        SeedData.Initialize();

        // Add services to the container.
        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

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
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
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

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseCors("AllowAny");

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
