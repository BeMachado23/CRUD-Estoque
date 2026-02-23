const URL_JAVA = "http://localhost:8080";
const URL_CSHARP = "http://localhost:5213";

// A "Chave de Trilho": altere a variável abaixo para escolher o motor
const API_URL = URL_CSHARP;


export interface Produto {
        id: number;
        nome: string;
        tipo: string;
        unidade: string;
        quantidade: number;
}

export interface ProdutoRequest {
        nome: string;
        tipo: string;
        unidade: string;
        quantidade: number;
}

export interface PaginacaoResponse {
        content: Produto[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        first: boolean;
        last: boolean;
}

export async function listarProdutos(page: number = 0, size: number = 10): Promise<PaginacaoResponse> {
        const response = await fetch(`${API_URL}/produtos?page=${page}&size=${size}`);
        if (!response.ok) {
                throw new Error("Erro ao buscar produtos");
        }
        return response.json();
}

export async function cadastrarProduto(produto: ProdutoRequest): Promise<Produto> {
        const response = await fetch(`${API_URL}/produtos`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
        });
        if (!response.ok) {
                throw new Error("Erro ao cadastrar produto");
        }
        return response.json();
}

export async function atualizarProduto(id: number, produto: ProdutoRequest): Promise<Produto> {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
                method: "PUT",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
        });
        if (!response.ok) {
                throw new Error("Erro ao atualizar produto");
        }
        return response.json();
}

export async function excluirProduto(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
                method: "DELETE",
        });
        if (!response.ok) {
                throw new Error("Erro ao excluir produto");
        }
}
