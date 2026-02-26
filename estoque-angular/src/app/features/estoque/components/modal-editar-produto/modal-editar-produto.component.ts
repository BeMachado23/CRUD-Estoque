import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../../models/produto.model';

@Component({
  selector: 'app-modal-editar-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-editar-produto.component.html'
})
export class ModalEditarProdutoComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() produto: Produto | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onEditar = new EventEmitter<Produto>();

  nome = '';
  tipo = '';
  unidade = '';

  // Substitui o truque do key={produto.id} do React
  ngOnChanges(changes: SimpleChanges) {
    if (changes['produto'] && this.produto) {
      this.nome = this.produto.nome;
      this.tipo = this.produto.tipo;
      this.unidade = this.produto.unidade;
    }
  }

  handleSubmit() {
    if (this.produto) {
      this.onEditar.emit({
        ...this.produto,
        nome: this.nome,
        tipo: this.tipo,
        unidade: this.unidade
      });
      // O onClose() do React foi substituído pelo evento abaixo
      this.onClose.emit();
    }
  }
}