using api_csharp.Models;

namespace api_csharp.DTOs;
public class ProdutoResponseDTO
{
    public int Id { get; init; }
    public string Nome { get; init; } = string.Empty;
    public string Tipo { get; init; } = string.Empty;
    public string Unidade { get; init; } = string.Empty;
    public int Quantidade { get; init; }

    // Construtor opcional para facilitar a conversão de Entidade para DTO (igual você fez no Java)
    public ProdutoResponseDTO(Produto produto)
    {
        Id = produto.Id;
        Nome = produto.Nome;
        Tipo = produto.Tipo;
        Unidade = produto.Unidade;
        Quantidade = produto.Quantidade;
    }
}