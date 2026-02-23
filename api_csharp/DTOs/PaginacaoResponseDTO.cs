namespace api_csharp.DTOs;

// Usamos <T> (Generics) para que esta paginação possa ser usada no futuro para Produtos, Clientes, Categorias, etc.

public class PaginacaoResponseDTO<T>
{
    public IEnumerable<T> Content { get; set; } = new List<T>();
    public int TotalElements { get; set; }
    public int TotalPages { get; set; }
    public int Size { get; set; }
    public int Number { get; set; }
    public bool First { get; set; }
    public bool Last { get; set; }
}