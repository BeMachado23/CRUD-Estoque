import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  private produtoService = inject(ProdutoService);

  produtos: Produto[] = [];
  carregando: boolean = false;
  paginaAtual: number = 0;
  temMaisPaginas: boolean = true;

  ngOnInit(): void {
    // Carregamos 20 itens na primeira vez para garantir que tenha scroll
    this.carregarProdutos(20);
  }

  carregarProdutos(quantidade: number = 10): void {
    if (this.carregando || !this.temMaisPaginas) return;

    this.carregando = true;
    this.produtoService.listarProdutos(this.paginaAtual, quantidade).subscribe({
      next: (resposta) => {
        this.produtos = [...this.produtos, ...resposta.content];
        this.temMaisPaginas = !resposta.last;
        this.carregando = false;
        this.paginaAtual++;
      },
      error: (erro) => {
        console.error('Erro:', erro);
        this.carregando = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 150;
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    if (position >= height - threshold) {
      this.carregarProdutos(10);
    }
  }
}
