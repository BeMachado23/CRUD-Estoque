package com.estoque.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ProdutoRequestDTO(
        @NotBlank(message = "O nome não pode estar vazio") @Size(max = 120, message = "O produto deve ter no máximo 120 caracteres") String nome,

        @NotBlank(message = "O tipo não pode estar vazio") @Size(max = 120, message = "O tipo deve ter no máximo 120 caracteres") String tipo,

        @NotBlank(message = "A unidade não pode estar vazia") String unidade,

        @PositiveOrZero(message = "A quantidade deve ser zero ou maior") Integer quantidade) {
}