using Microsoft.EntityFrameworkCore;
using api_csharp.Data;
using api_csharp.DTOs;
using api_csharp.Models;

namespace api_csharp.Services;

//assina o contrato da interface
public class ProdutoService : IProdutoService 
{
    private readonly AppDbContext _context;

    // Injeção de dependência via construtor (o C# faz isso automaticamente)
    public ProdutoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PaginacaoResponseDTO<ProdutoResponseDTO>> BuscarTodosAsync(int page, int size)
{
    // 1. Conta o total de itens no banco (para calcular o total de páginas)
    var totalElements = await _context.Produtos.CountAsync();
    var totalPages = (int)Math.Ceiling(totalElements / (double)size);

    // 2. Busca apenas os itens da página atual
    var produtos = await _context.Produtos
        .OrderBy(p => p.Id) // É obrigatório ordenar antes de paginar no C#
        .Skip(page * size)  // Pula os itens das páginas anteriores
        .Take(size)         // Pega apenas a quantidade solicitada
        .ToListAsync();

    var content = produtos.Select(p => new ProdutoResponseDTO(p));

    // 3. Monta o "envelope" com os dados que o React/Next.js espera
    return new PaginacaoResponseDTO<ProdutoResponseDTO>
    {
        Content = content,
        TotalElements = totalElements,
        TotalPages = totalPages,
        Size = size,
        Number = page,
        First = page == 0,
        Last = page >= totalPages - 1 || totalElements == 0
    };
}

    public async Task<ProdutoResponseDTO?> BuscarPorIdAsync(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        return produto == null ? null : new ProdutoResponseDTO(produto);
    }

    public async Task<ProdutoResponseDTO> CadastrarAsync(ProdutoRequestDTO dto)
    {
        var produto = new Produto
        {
            Nome = dto.Nome,
            Tipo = dto.Tipo,
            Unidade = dto.Unidade,
            Quantidade = dto.Quantidade
        };

        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync(); // É aqui que o INSERT acontece no PostgreSQL

        return new ProdutoResponseDTO(produto);
    }

    public async Task<ProdutoResponseDTO?> AtualizarAsync(int id, ProdutoRequestDTO dto)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return null;

        produto.Nome = dto.Nome;
        produto.Tipo = dto.Tipo;
        produto.Unidade = dto.Unidade;
        produto.Quantidade = dto.Quantidade;

        await _context.SaveChangesAsync(); // É aqui que o UPDATE acontece

        return new ProdutoResponseDTO(produto);
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return false;

        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync(); // É aqui que o DELETE acontece

        return true;
    }
}