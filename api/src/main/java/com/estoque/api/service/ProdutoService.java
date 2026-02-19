package com.estoque.api.service;

import com.estoque.api.dto.ProdutoRequestDTO;
import com.estoque.api.dto.ProdutoResponseDTO;
import com.estoque.api.model.Produto;
import com.estoque.api.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class ProdutoService {

    private final ProdutoRepository repository;

    //Injeção via Construtor (boa prática que substitui o @Autowired na variável)
    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    // LISTAR TODOS (Read)
    public List<ProdutoResponseDTO> listarTodos() {
        return repository.findAll().stream()
                .map(ProdutoResponseDTO::new) // Converte cada Entidade do banco para o DTO de saída
                .toList();
    }

    // CADASTRAR (Create)
    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        // A. Converte o DTO de entrada para a Entidade do banco
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setTipo(dto.tipo());
        produto.setUnidade(dto.unidade());
        produto.setQuantidade(dto.quantidade());

        // B. Salva no banco de dados
        Produto produtoSalvo = repository.save(produto);

        // C. Converte o resultado salvo para o DTO de saída e devolve
        return new ProdutoResponseDTO(produtoSalvo);
    }

    // ATUALIZAR (Update)
    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        // Vai no banco e tenta achar o produto. Se não achar, lança um erro!
        Produto produtoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com o ID: " + id));

        // Atualiza os dados
        produtoExistente.setNome(dto.nome());
        produtoExistente.setTipo(dto.tipo());
        produtoExistente.setUnidade(dto.unidade());
        produtoExistente.setQuantidade(dto.quantidade());

        // Salva por cima e devolve o DTO
        Produto produtoAtualizado = repository.save(produtoExistente);
        return new ProdutoResponseDTO(produtoAtualizado);
    }

    // EXCLUIR (Delete)
    public void excluir(Long id) {
        // Verifica se existe antes de deletar
        if (!repository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com o ID: " + id);
        }
        repository.deleteById(id);
    }
}