"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./ui/SearchBar";
import ActionButton from "./ui/ActionButton";
import TabelaProdutos, { Produto } from "./ui/TabelaProdutos";
import ModalCadastrarProduto from "./ui/ModalCadastrarProduto";
import * as api from "../services/api";

export default function Estoque() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Filtrar produtos pela busca
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Carregar produtos ao montar o componente
  useEffect(() => {
    carregarProdutos(0, true);
  }, []);

  const carregarProdutos = async (page: number, reset: boolean = false) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await api.listarProdutos(page, 10);
      
      if (reset) {
        setProdutos(data.content);
      } else {
        setProdutos((prev) => [...prev, ...data.content]);
      }
      
      setHasMore(!data.last);
      setPaginaAtual(page);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Observar o elemento sentinela para carregar mais
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          carregarProdutos(paginaAtual + 1, false);
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, paginaAtual]);

  const handleUpdateQuantidade = async (id: number, delta: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    const novaQuantidade = Math.max(0, produto.quantidade + delta);
    try {
      const atualizado = await api.atualizarProduto(id, {
        nome: produto.nome,
        tipo: produto.tipo,
        unidade: produto.unidade,
        quantidade: novaQuantidade,
      });
      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? atualizado : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  const handleSetQuantidade = async (id: number, quantidade: number) => {
    const produto = produtos.find((p) => p.id === id);
    if (!produto) return;

    const novaQuantidade = Math.max(0, quantidade);
    try {
      const atualizado = await api.atualizarProduto(id, {
        nome: produto.nome,
        tipo: produto.tipo,
        unidade: produto.unidade,
        quantidade: novaQuantidade,
      });
      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? atualizado : p))
      );
    } catch (error) {
      console.error("Erro ao definir quantidade:", error);
    }
  };

  const handleCadastrarProduto = async (novoProduto: { nome: string; tipo: string; unidade: string }) => {
    try {
      const criado = await api.cadastrarProduto({
        ...novoProduto,
        quantidade: 0,
      });
      setProdutos((prev) => [...prev, criado]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  const handleExcluirProduto = async (id: number) => {
    try {
      await api.excluirProduto(id);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleEditarProduto = async (produtoEditado: Produto) => {
    try {
      const atualizado = await api.atualizarProduto(produtoEditado.id, {
        nome: produtoEditado.nome,
        tipo: produtoEditado.tipo,
        unidade: produtoEditado.unidade,
        quantidade: produtoEditado.quantidade,
      });
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === atualizado.id ? atualizado : produto
        )
      );
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      {/* Header */}
      <header className="bg-[#2C2C32] py-4 px-6 xl:py-6 xl:px-8">
        <div className="max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-between">
          <SearchBar value={busca} onChange={setBusca} />
          <div className="flex items-center gap-3 xl:gap-4">
            <ActionButton onClick={() => setModalCadastroAberto(true)}>Cadastrar produto</ActionButton>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-5xl xl:max-w-6xl mx-auto py-6 px-6 xl:py-8 xl:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : (
          <>
            <TabelaProdutos
              produtos={produtosFiltrados}
              onUpdateQuantidade={handleUpdateQuantidade}
              onSetQuantidade={handleSetQuantidade}
              onEditarProduto={handleEditarProduto}
              onExcluirProduto={handleExcluirProduto}
            />
            
            {/* Elemento sentinela para scroll infinito */}
            <div ref={observerTarget} className="h-4" />
            
            {/* Indicador de carregando mais */}
            {loadingMore && (
              <div className="flex justify-center items-center py-6">
                <p className="text-gray-500">Carregando mais produtos...</p>
              </div>
            )}
            
            {/* Fim da lista */}
            {!hasMore && produtos.length > 0 && (
              <div className="flex justify-center items-center py-6">
                <p className="text-gray-400 text-sm">Todos os produtos foram carregados</p>
              </div>
            )}
          </>
        )}
      </main>

    
      <ModalCadastrarProduto
        isOpen={modalCadastroAberto}
        onClose={() => setModalCadastroAberto(false)}
        onCadastrar={handleCadastrarProduto}
      />
    </div>
  );
}