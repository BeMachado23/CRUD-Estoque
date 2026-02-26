# Sistema de Gestão de Stock (Estoque)

Este é um projeto **Full Stack** desenvolvido para a gestão eficiente de produtos. O sistema permite realizar o CRUD completo com uma interface moderna e carregamento dinâmico de dados.

## 🚀 Tecnologias Utilizadas

### **Frontend**
* **Angular 18+**: Framework principal com arquitetura de *Standalone Components*.
* **Tailwind CSS**: Estilização responsiva e moderna.
* **Intersection Observer API**: Implementação de *Infinite Scroll* para otimização da listagem.

### **Backend**
* **C# / .NET**: API para processamento das regras de negócio.
* **Entity Framework Core**: ORM para persistência de dados.
* **PostgreSQL**: Base de dados relacional.

---

## 🛠️ Como Executar o Projeto

### **1. Configuração da Base de Dados**
1.  Crie uma base de dados no PostgreSQL chamada `estoque_db`.
2.  No projeto backend, atualize as credenciais de ligação no ficheiro de configuração.

---

### **2. Executar o Backend (C#)**
No terminal, navegue até à pasta da API e execute:

```bash
# Restaurar dependências
dotnet restore

# Aplicar as Migrations à base de dados
dotnet ef database update

# Executar a aplicação
dotnet run
