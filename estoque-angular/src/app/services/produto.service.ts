import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, PaginacaoResponse, ProdutoRequest } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);

  // A URL agora aponta para o seu novo backend em C#
  private apiUrl = 'http://127.0.0.1:5213/produtos';

  // 1. Equivalente ao listarProdutos do Next.js
  listarProdutos(page: number = 0, size: number = 10): Observable<PaginacaoResponse> {
    return this.http.get<PaginacaoResponse>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // 2. Equivalente ao cadastrarProduto do Next.js
  cadastrarProduto(produto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  // 3. Equivalente ao atualizarProduto do Next.js
  atualizarProduto(id: number, produto: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  // 4. Equivalente ao excluirProduto do Next.js
  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
