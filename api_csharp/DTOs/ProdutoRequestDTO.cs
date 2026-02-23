using System.ComponentModel.DataAnnotations;

namespace api_csharp.DTOs;
public class ProdutoRequestDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    public string Nome { get; init; } = string.Empty; 

    [Required(ErrorMessage = "O tipo é obrigatório.")]
    public string Tipo { get; init; } = string.Empty;

    [Required(ErrorMessage = "A unidade é obrigatória.")]
    public string Unidade { get; init; } = string.Empty;

    [Range(0, int.MaxValue, ErrorMessage = "A quantidade não pode ser negativa.")]
    public int Quantidade { get; init; } 
}
// O uso de init em vez de set garante que, uma vez que o C# crie este objeto com os dados do JSON, ele não pode ser alterado no meio do código, tornando-o mais seguro