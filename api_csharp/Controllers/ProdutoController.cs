using Microsoft.AspNetCore.Mvc;
using api_csharp.DTOs;
using api_csharp.Services;

namespace api_csharp.Controllers;

[ApiController]
[Route("produtos")] // A mesma rota que utilizava no Java
public class ProdutoController : ControllerBase
{
    private readonly IProdutoService _produtoService;

    // O C# injeta o serviço automaticamente aqui
    public ProdutoController(IProdutoService produtoService)
    {
        _produtoService = produtoService;
    }

   // GET: /produtos?page=0&size=10
    [HttpGet]
    // Usamos [FromQuery] para capturar os parâmetros da URL. Definimos 0 e 10 como valores padrão.
    public async Task<ActionResult<PaginacaoResponseDTO<ProdutoResponseDTO>>> ListarTodos([FromQuery] int page = 0, [FromQuery] int size = 10)
    {
        var resultado = await _produtoService.BuscarTodosAsync(page, size);
        return Ok(resultado);
    }

    // GET: /produtos/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ProdutoResponseDTO>> BuscarPorId(int id)
    {
        var produto = await _produtoService.BuscarPorIdAsync(id);
        
        if (produto == null)
            return NotFound(new { mensagem = "Produto não encontrado." });

        return Ok(produto);
    }

    // POST: /produtos
    [HttpPost]
    public async Task<ActionResult<ProdutoResponseDTO>> Cadastrar([FromBody] ProdutoRequestDTO dto)
    {
        var produtoCriado = await _produtoService.CadastrarAsync(dto);
        
        // Devolve o status 201 (Created) e o caminho para o recurso criado
        return CreatedAtAction(nameof(BuscarPorId), new { id = produtoCriado.Id }, produtoCriado);
    }

    // PUT: /produtos/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<ProdutoResponseDTO>> Atualizar(int id, [FromBody] ProdutoRequestDTO dto)
    {
        var produtoAtualizado = await _produtoService.AtualizarAsync(id, dto);
        
        if (produtoAtualizado == null)
            return NotFound(new { mensagem = "Produto não encontrado para atualização." });

        return Ok(produtoAtualizado);
    }

    // DELETE: /produtos/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var sucesso = await _produtoService.ExcluirAsync(id);
        
        if (!sucesso)
            return NotFound(new { mensagem = "Produto não encontrado." });

        return NoContent(); // Status 204: Sucesso, mas sem conteúdo para devolver
    }
}