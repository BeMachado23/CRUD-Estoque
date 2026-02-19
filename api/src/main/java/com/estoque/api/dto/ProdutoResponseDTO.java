package com.estoque.api.dto;

import com.estoque.api.model.Produto;

public record ProdutoResponseDTO(
    Long id,
    String nome,
    String tipo,
    String unidade,
    Integer quantidade
) {
    // Um macete muito usado no mercado: um construtor que converte Model em DTO
    public ProdutoResponseDTO(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getTipo(), produto.getUnidade(), produto.getQuantidade());
    }
}