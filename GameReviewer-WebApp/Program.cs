using GameReviewer.DataAccess.Authentication;
using GameReviewer.DataAccess.GameDbContext;
using GameReviewer.DataAccess.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //// Reseed the database
        //SeedData.Initialize();

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
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
            });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add the DbContext to the DI container
        builder.Services.AddDbContext<GameReviewerDbContext>(options =>
        {
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("GameReviewer.DataAccess")); // Specify the migrations assembly here
        });

        // Configure Identity
        builder.Services.AddIdentityApiEndpoints<Reviewer>(options =>
        {
            options.SignIn.RequireConfirmedAccount = false; // Disable email confirmation
        })
        .AddEntityFrameworkStores<GameReviewerDbContext>();

        // Retrieve jwtSecret from configuration
        var jwtAudience = builder.Configuration.GetSection("Jwt:Audience").Get<string>();
        var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
        var jwtKey = builder.Configuration.GetSection("Jwt:SecretKey").Get<string>();

        // Register JwtTokenGenerator with jwtSecret value
        builder.Services.AddScoped<JwtTokenGenerator>(_ => new JwtTokenGenerator(builder.Configuration));

        // Configure Authentication
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            //Configure JWT authentication parameters
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey))
                // Configure other parameters as needed
            };

        });

        // Register HttpClient
        builder.Services.AddHttpClient();

        // Configure the IGDB service
        builder.Services.AddScoped<IgdbService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        // Enable CORS
        app.UseCors("AllowAny");

        // Authentication and Authorization
        app.UseAuthentication();
        app.UseAuthorization();

        // Map Identity API endpoints
        app.MapIdentityApi<Reviewer>();

        // Map IGDB API endpoint
        app.Map("/api/igdb", IgdbEndpoint);

        app.MapControllers();

        app.Run();
    }

    private static void IgdbEndpoint(IApplicationBuilder app)
    {
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
