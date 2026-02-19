package com.estoque.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record ProdutoRequestDTO(
    @NotBlank(message = "O nome não pode estar vazio")
    String nome,
    
    @NotBlank(message = "O tipo não pode estar vazio")
    String tipo,
    
    @NotBlank(message = "A unidade não pode estar vazia")
    String unidade,
    
    @PositiveOrZero(message = "A quantidade deve ser zero ou maior")
    Integer quantidade
) {}