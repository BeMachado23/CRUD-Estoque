import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../../models/produto.model';

@Component({
  selector: 'app-modal-confirmar-exclusao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmar-exclusao.component.html'
})
export class ModalConfirmarExclusaoComponent {
  @Input() isOpen: boolean = false;
  @Input() produto: Produto | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirmar = new EventEmitter<void>();
}