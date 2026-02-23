using Microsoft.EntityFrameworkCore;
using api_csharp.Data;
using api_csharp.Services;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// 1. CONFIGURAÇÃO DE SERVIÇOS (Sempre ANTES do builder.Build)
// ============================================================

// A. Configuração do Banco de Dados PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// B. Injeção de Dependência do seu Service
builder.Services.AddScoped<IProdutoService, ProdutoService>();

// C. Configuração do CORS (Permite que o Next.js acesse a API)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// D. Habilita o uso de Controllers
builder.Services.AddControllers();
builder.Services.AddOpenApi(); // Mantém o suporte a documentação nativa do .NET 10

var app = builder.Build();

// ============================================================
// 2. CONFIGURAÇÃO DO PIPELINE (Sempre DEPOIS do builder.Build)
// ============================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Ativa o CORS (deve vir antes do MapControllers)
app.UseCors();

// Faz com que o C# encontre os seus arquivos dentro da pasta Controllers
app.MapControllers();

app.Run();