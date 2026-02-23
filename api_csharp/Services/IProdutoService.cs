using api_csharp.DTOs;

namespace api_csharp.Services;
public interface IProdutoService
{
   // Usamos 'Task' porque as operações no banco serão Assíncronas (async/await)
    Task<PaginacaoResponseDTO<ProdutoResponseDTO>> BuscarTodosAsync(int page, int size);
    Task<ProdutoResponseDTO?> BuscarPorIdAsync(int id);
    Task<ProdutoResponseDTO> CadastrarAsync(ProdutoRequestDTO dto);
    Task<ProdutoResponseDTO?> AtualizarAsync(int id, ProdutoRequestDTO dto);
    Task<bool> ExcluirAsync(int id);     
}