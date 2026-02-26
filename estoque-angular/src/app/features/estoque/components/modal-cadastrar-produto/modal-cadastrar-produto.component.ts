import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-cadastrar-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-cadastrar-produto.component.html'
})
export class ModalCadastrarProdutoComponent {
  @Input() isOpen: boolean = false;
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onCadastrar = new EventEmitter<{ nome: string; tipo: string; unidade: string }>();

  // Estados locais (Substituem os useState)
  nome = '';
  tipo = '';
  unidade = 'Un';
  
  nomeErro = '';
  tipoErro = '';
  unidadeErro = '';

  handleSubmit() {
    let hasError = false;

    // Validar nome
    if (!this.nome.trim()) {
      this.nomeErro = 'O nome do produto é obrigatório.';
      hasError = true;
    } else if (this.nome.length > 120) {
      this.nomeErro = 'O nome do produto deve ter no máximo 120 caracteres.';
      hasError = true;
    } else {
      this.nomeErro = '';
    }

    // Validar tipo
    if (!this.tipo.trim()) {
      this.tipoErro = 'O tipo do produto é obrigatório.';
      hasError = true;
    } else {
      this.tipoErro = '';
    }

    // Validar unidade
    if (!this.unidade) {
      this.unidadeErro = 'A unidade é obrigatória.';
      hasError = true;
    } else {
      this.unidadeErro = '';
    }

    if (hasError) return;

    // Emitir os dados para o componente pai
    this.onCadastrar.emit({ 
      nome: this.nome, 
      tipo: this.tipo, 
      unidade: this.unidade 
    });
    
    this.limparFormulario();
  }

  handleClose() {
    this.limparFormulario();
    this.onClose.emit();
  }

  private limparFormulario() {
    this.nome = '';
    this.tipo = '';
    this.unidade = 'Un';
    this.nomeErro = '';
    this.tipoErro = '';
    this.unidadeErro = '';
  }

  // Funções para limpar o erro ao digitar (substituem o "if (nomeErro) setNomeErro('')" do onChange no React)
  aoDigitarNome() {
    if (this.nomeErro) this.nomeErro = '';
  }

  aoDigitarTipo() {
    if (this.tipoErro) this.tipoErro = '';
  }

  aoMudarUnidade() {
    if (this.unidadeErro) this.unidadeErro = '';
  }
}