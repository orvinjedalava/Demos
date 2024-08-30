using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using netcore_webapi.Authenitication.Basic;
using netcore_webapi.Authentication.Basic;
using netcore_webapi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.AddSecurityDefinition(
        BasicAuthenticationDefaults.AuthenticationScheme,
        new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
        {
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
            Scheme = BasicAuthenticationDefaults.AuthenticationScheme,
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

});

builder.Services.AddAuthentication()
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>(
        BasicAuthenticationDefaults.AuthenticationScheme, 
        null
    );

var app = builder.Build();

// Azure API Management needs the swagger definition to always be present.
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
