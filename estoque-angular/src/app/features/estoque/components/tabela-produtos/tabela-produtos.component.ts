import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../../models/produto.model';

// Importação dos subcomponentes da tabela
import { QuantidadeControleComponent } from '../quantidade-controle/quantidade-controle.component';
import { ModalEditarProdutoComponent } from '../modal-editar-produto/modal-editar-produto.component';
import { ModalConfirmarExclusaoComponent } from '../modal-confirmar-exclusao/modal-confirmar-exclusao.component';

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [
    CommonModule,
    QuantidadeControleComponent,
    ModalEditarProdutoComponent,
    ModalConfirmarExclusaoComponent
  ],
  templateUrl: './tabela-produtos.component.html'
})
export class TabelaProdutosComponent {
  @Input() produtos: Produto[] = [];

  @Output() onUpdateQuantidade = new EventEmitter<{id: number, delta: number}>();
  @Output() onSetQuantidade = new EventEmitter<{id: number, quantidade: number}>();
  @Output() onEditarProduto = new EventEmitter<Produto>();
  @Output() onExcluirProduto = new EventEmitter<number>();

  modalEditarAberto = false;
  modalExcluirAberto = false;
  produtoSelecionado: Produto | null = null;

  handleAbrirModalEditar(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modalEditarAberto = true;
  }

  handleEditar(produto: Produto) {
    this.onEditarProduto.emit(produto);
    this.modalEditarAberto = false;
    this.produtoSelecionado = null;
  }

  handleAbrirModalExcluir(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modalExcluirAberto = true;
  }

  handleConfirmarExclusao() {
    if (this.produtoSelecionado) {
      this.onExcluirProduto.emit(this.produtoSelecionado.id);
      this.modalExcluirAberto = false;
      this.produtoSelecionado = null;
    }
  }

  handleCancelarExclusao() {
    this.modalExcluirAberto = false;
    this.produtoSelecionado = null;
  }
}