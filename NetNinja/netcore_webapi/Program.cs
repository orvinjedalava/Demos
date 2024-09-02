using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using netcore_webapi.Authenitication.Basic;
using netcore_webapi.Authentication.Basic;
using netcore_webapi.Authentication.JwtBearer;
using netcore_webapi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    // Adding Basic authentication to swagger
    options.AddSecurityDefinition(
        BasicAuthenticationDefaults.AuthenticationScheme,
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
        {
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
            Scheme = BasicAuthenticationDefaults.AuthenticationScheme,
            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
            Description = "Basic Auhtorization Header using the Basic scheme.",
        }
    );

    options.AddSecurityRequirement(
        new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference()
                    {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                        Id = BasicAuthenticationDefaults.AuthenticationScheme,
                    },
                },
                new string[] { BasicAuthenticationDefaults.AuthenticationScheme}
            }
        }
    );

    // Adding Jwt authentication to swagger
    options.AddSecurityDefinition(
        JwtBearerDefaults.AuthenticationScheme,
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
        {
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
            Scheme = JwtBearerDefaults.AuthenticationScheme,
            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
            BearerFormat = "JWT",
            Description = "Jwt Auhtorization Header using the Bearer scheme.",
        }
    );

    options.AddSecurityRequirement(
        new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference()
                    {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                        Id = JwtBearerDefaults.AuthenticationScheme,
                    },
                },
                new string[] { JwtBearerDefaults.AuthenticationScheme}
            }
        }
    );

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHostOrigin", 
    builder => builder
        .WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddOptions<JwtBearerSettings>()
    .Bind(builder.Configuration.GetSection("JwtBearer"))
    .ValidateDataAnnotations();

builder.Services
    .AddAuthentication(options => 
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>(
        BasicAuthenticationDefaults.AuthenticationScheme, 
        null
    )
    .AddScheme<JwtBearerOptions, JwtBearerHandler>(
        JwtBearerDefaults.AuthenticationScheme, 
        options => {
            var jwtBearerSettings = builder.Configuration.GetSection("JwtBearer").Get<JwtBearerSettings>();

            if (jwtBearerSettings == null)
            {
                throw new NullReferenceException("JwtBearerSettings not found in configuration");
            }

            options.SaveToken = true;
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                //ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtBearerSettings.Issuer,
                ValidAudience = jwtBearerSettings.Audience,
                IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtBearerSettings.SigningKey)),
                ClockSkew = TimeSpan.Zero,
            };
        }
    );



var app = builder.Build();

// Azure API Management needs the swagger definition to always be present.
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    
}

app.UseCors("AllowLocalHostOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers().RequireAuthorization();

app.Run();
