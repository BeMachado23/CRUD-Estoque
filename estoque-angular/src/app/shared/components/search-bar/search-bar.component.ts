import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  // Equivalente ao 'value' da interface em next
  @Input() value: string = '';

  // Equivalente ao 'onChange: (value: string) => void' da interface em next
  @Output() onChange = new EventEmitter<string>();

  // Função que captura o que foi digitado e envia para o componente pai (Estoque)
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange.emit(inputElement.value);
  }
}