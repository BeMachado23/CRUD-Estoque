import { Component } from '@angular/core';
import { EstoqueComponent } from './features/estoque/estoque.component'; // Verifique o caminho!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EstoqueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estoque-angular';
}
