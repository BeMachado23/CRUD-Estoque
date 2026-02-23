using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_csharp.Models;

[Table("produtos")]
public class Produto
{
    [Key]
    [Column("id")] // Diz ao C# para procurar a coluna "id" minúscula
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O tipo é obrigatório.")]
    [Column("tipo")]
    public string Tipo { get; set; } = string.Empty;

    [Required(ErrorMessage = "A unidade é obrigatória.")]
    [Column("unidade")]
    public string Unidade { get; set; } = string.Empty;

    [Range(0, int.MaxValue, ErrorMessage = "A quantidade não pode ser negativa.")]
    [Column("quantidade")]
    public int Quantidade { get; set; }
}