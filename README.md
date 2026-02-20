# Sistema de Gerenciamento de Estoque (CRUD)

Este projeto é uma aplicação full-stack para controle de estoque, permitindo gerenciar produtos através de uma interface web moderna conectada a uma API.

## 🚀 Tecnologias Utilizadas

### Backend
* **Java 17**
* **Spring Boot 3.4.1**
* **Spring Data JPA** para persistência
* **PostgreSQL** como banco de dados relacional
* **Lombok** para redução de código boilerplate
* **Bean Validation** para validação de dados

### Frontend
* **Next.js 15.1.4**
* **React 19**
* **TypeScript** para tipagem estática
* **Tailwind CSS** para estilização
* **Lucide React** para ícones

## 🛠️ Como Executar o Projeto

### Pré-requisitos
* JDK 17 ou superior.
* Node.js instalado.
* Instância do PostgreSQL ativa.

### 1. Configuração do Backend
1. Navegue até a pasta `api`.
2. Configure a conexão com o banco de dados no arquivo `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/estoque_db
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
3. Selecione a pasta `ApiApplication.java`

### 2. Configuracao do Frontend
1. Navegue até a pasta `estoque-frontend`.
2. Instale as dependencias com `npm install`
3. Rode o código  com `npm run dev`
   
