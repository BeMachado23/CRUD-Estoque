import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  templateUrl: './action-button.component.html'
})
export class ActionButtonComponent {
  // Equivalente ao 'onClick?: () => void'
  @Output() onClick = new EventEmitter<void>();
}