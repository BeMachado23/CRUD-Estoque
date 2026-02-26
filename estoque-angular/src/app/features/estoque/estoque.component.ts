import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { Produto, ProdutoRequest } from '../../models/produto.model';

import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { ActionButtonComponent } from '../../shared/components/action-button/action-button.component';
import { TabelaProdutosComponent } from './components/tabela-produtos/tabela-produtos.component';
import { ModalCadastrarProdutoComponent } from './components/modal-cadastrar-produto/modal-cadastrar-produto.component';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    ActionButtonComponent,
    TabelaProdutosComponent,
    ModalCadastrarProdutoComponent
  ],
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit, OnDestroy {
  private produtoService = inject(ProdutoService);
  
  // INJETANDO AS FERRAMENTAS DE ATUALIZAÇÃO DE TELA DO ANGULAR
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  produtos: Produto[] = [];
  modalCadastroAberto = false;
  loading = true;
  loadingMore = false;
  busca = '';
  paginaAtual = 0;
  hasMore = true;

  private observer: IntersectionObserver | null = null;

  @ViewChild('observerTarget') set target(element: ElementRef) {
    if (element) {
      this.configurarObserver(element.nativeElement);
    }
  }

  get produtosFiltrados(): Produto[] {
    if (!this.busca) return this.produtos;
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(this.busca.toLowerCase())
    );
  }

  ngOnInit() {
    this.carregarProdutos(0, true);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private configurarObserver(elemento: HTMLElement) {
    if (this.observer) {
      this.observer.disconnect();
    }

    // Colocamos o Observer para rodar fora do Angular para não travar a tela...
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.hasMore && !this.loadingMore && !this.loading) {
          
          // ...Mas quando precisamos carregar mais itens, chamamos de volta para dentro do Angular!
          this.ngZone.run(() => {
            this.carregarProdutos(this.paginaAtual + 1, false);
          });
          
        }
      }, { 
        rootMargin: '200px',
        threshold: 0.1 
      });

      this.observer.observe(elemento);
    });
  }

  carregarProdutos(page: number, reset: boolean = false) {
    if (reset) {
      this.loading = true;
    } else {
      this.loadingMore = true;
    }
    this.cdr.detectChanges(); // Força a tela a mostrar o spinner

    this.produtoService.listarProdutos(page, 10).subscribe({
      next: (data) => {
        if (reset) {
          this.produtos = data.content;
        } else {
          this.produtos = [...this.produtos, ...data.content];
        }
        this.hasMore = !data.last;
        this.paginaAtual = page;
        this.cdr.detectChanges(); // Força a tela a desenhar os novos produtos
      },
      error: (error) => {
        console.error("Erro ao carregar produtos:", error);
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this.loadingMore = false;
        this.cdr.detectChanges(); // Força a tela a esconder o spinner
      }
    });
  }

  atualizarBusca(novaBusca: string) {
    this.busca = novaBusca;
  }

  abrirModalCadastro() {
    this.modalCadastroAberto = true;
  }

  fecharModalCadastro() {
    this.modalCadastroAberto = false;
  }

  handleUpdateQuantidade(evento: { id: number, delta: number }) {
    const produto = this.produtos.find(p => p.id === evento.id);
    if (!produto) return;

    const novaQuantidade = Math.max(0, produto.quantidade + evento.delta);
    const payload: ProdutoRequest = {
      nome: produto.nome,
      tipo: produto.tipo,
      unidade: produto.unidade,
      quantidade: novaQuantidade
    };

    this.produtoService.atualizarProduto(evento.id, payload).subscribe({
      next: (atualizado) => {
        this.produtos = this.produtos.map(p => p.id === evento.id ? atualizado : p);
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Erro ao atualizar quantidade:", error)
    });
  }

  handleSetQuantidade(evento: { id: number, quantidade: number }) {
    const produto = this.produtos.find(p => p.id === evento.id);
    if (!produto) return;

    const novaQuantidade = Math.max(0, evento.quantidade);
    const payload: ProdutoRequest = {
      nome: produto.nome,
      tipo: produto.tipo,
      unidade: produto.unidade,
      quantidade: novaQuantidade
    };

    this.produtoService.atualizarProduto(evento.id, payload).subscribe({
      next: (atualizado) => {
        this.produtos = this.produtos.map(p => p.id === evento.id ? atualizado : p);
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Erro ao definir quantidade:", error)
    });
  }

  handleCadastrarProduto(novoProduto: any) {
    const payload: ProdutoRequest = { ...novoProduto, quantidade: 0 };
    
    this.produtoService.cadastrarProduto(payload).subscribe({
      next: (criado) => {
        this.produtos = [...this.produtos, criado];
        this.fecharModalCadastro();
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Erro ao cadastrar produto:", error)
    });
  }

  handleExcluirProduto(id: number) {
    this.produtoService.excluirProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(p => p.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Erro ao excluir produto:", error)
    });
  }

  handleEditarProduto(produtoEditado: Produto) {
    const payload: ProdutoRequest = {
      nome: produtoEditado.nome,
      tipo: produtoEditado.tipo,
      unidade: produtoEditado.unidade,
      quantidade: produtoEditado.quantidade
    };

    this.produtoService.atualizarProduto(produtoEditado.id, payload).subscribe({
      next: (atualizado) => {
        this.produtos = this.produtos.map(p => p.id === atualizado.id ? atualizado : p);
        this.cdr.detectChanges();
      },
      error: (error) => console.error("Erro ao editar produto:", error)
    });
  }
}