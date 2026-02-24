import { Component } from '@angular/core';
import { EstoqueComponent } from './components/estoque/estoque.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EstoqueComponent],
  template: `
    <main class="min-h-screen bg-[#F3F3F3] py-8">
      <app-estoque></app-estoque>
    </main>
  `,
})
export class AppComponent {
  title = 'estoque-angular';
}
