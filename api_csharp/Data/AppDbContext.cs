using api_csharp.Models; //classe produto
using Microsoft.EntityFrameworkCore;

namespace api_csharp.Data;
public class AppDbContext : DbContext
{
        //construtor que recebe as configuraçoes (como a string de conexao)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
                
        }

        // O DbSet representa a tabela no banco de dados
        //é nele onde será feito os inserts, selects, updates e deletes
        public DbSet<Produto> Produtos { get; set; }
}