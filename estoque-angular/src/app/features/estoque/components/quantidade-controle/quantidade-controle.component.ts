import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-quantidade-controle',
  standalone: true,
  templateUrl: './quantidade-controle.component.html'
})
export class QuantidadeControleComponent implements OnChanges, OnDestroy {
  @Input() quantidade: number = 0;
  
  @Output() onIncrement = new EventEmitter<void>();
  @Output() onDecrement = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<number>();

  valorLocal: number = 0;
  private timeoutId: any;

  // Equivalente ao: useEffect(() => setValorLocal(quantidade), [quantidade])
  ngOnChanges(changes: SimpleChanges) {
    if (changes['quantidade']) {
      this.valorLocal = this.quantidade;
    }
  }

  // Limpeza de memória (clearTimeout do useEffect)
  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = parseInt(inputElement.value, 10);

    if (!isNaN(valor) && valor >= 0) {
      this.valorLocal = valor;
      this.agendarAtualizacao();
    } else {
      // Se apagar tudo ou puser valor inválido, volta visualmente ao valor anterior
      inputElement.value = this.valorLocal.toString();
    }
  }

  // Equivalente ao: useEffect com setTimeout de 500ms
  private agendarAtualizacao() {
    if (this.valorLocal === this.quantidade) return;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.onChange.emit(this.valorLocal);
    }, 500);
  }
}