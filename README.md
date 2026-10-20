# Gerenciador de Projetos

API REST para cadastrar e acompanhar projetos, feita com **Node.js**, **Express** e **MySQL**. Permite criar, listar, buscar, atualizar, excluir e marcar projetos como concluídos (CRUD completo).

Projeto desenvolvido durante o curso Técnico em Desenvolvimento de Sistemas (SENAI/SC).

## Tecnologias

- Node.js 20
- Express
- MySQL (`mysql2` com pool de conexões)
- dotenv (variáveis de ambiente)
- CORS
- HTML e CSS (layout da interface)

## Estrutura

| Arquivo | Função |
|---|---|
| `index.js` | Servidor Express e rotas da API |
| `services.js` | Consultas ao banco (classe `DatabaseProjetos`) |
| `database.js` | Conexão com o MySQL (pool) |
| `create-table.js` | Cria a tabela `projetos` |
| `endpoin.http` | Exemplos de requisições para testar a API |
| `index.html` e `style.css` | Layout da interface web |

## Como rodar

**Pré-requisitos:** Node.js 20 e um servidor MySQL rodando.

1. Clone o repositório e entre na pasta:
```bash
   git clone https://github.com/bernardotakeda/gerenciador-de-projetos.git
   cd gerenciador-de-projetos
```
2. Instale as dependências:
```bash
   npm install
```
3. Crie um banco de dados no MySQL (por exemplo, `gerenciador_projetos`).
4. Crie o arquivo `.env` na raiz do projeto:
```env
   DATABASE=gerenciador_projetos
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=seu_usuario
   DATABASE_PASS=sua_senha
```
5. Crie a tabela:
```bash
   node create-table.js
```
6. Inicie a API:
```bash
   npm run dev
```
   O servidor sobe em `http://localhost:3333`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/projetos` | Cria um projeto |
| `GET` | `/projetos` | Lista os projetos **não concluídos** |
| `GET` | `/projetos/concluidos` | Lista os projetos concluídos |
| `GET` | `/projetos/:id` | Busca um projeto pelo ID |
| `PUT` | `/projetos/:id` | Atualiza título, descrição e status |
| `PUT` | `/concluir/:id` | Marca um projeto como concluído |
| `DELETE` | `/projetos/:id` | Exclui um projeto |

### Exemplo: criar um projeto

```http
POST http://localhost:3333/projetos
Content-Type: application/json

{
  "titulo": "Aplicativo financeiro",
  "descricao": "Aplicativo de gerenciamento financeiro pessoal",
  "concluido": false
}
```

Resposta: `201 Created`. O `id` é gerado automaticamente (UUID). Se `concluido` não for enviado, o projeto é criado como não concluído.

Mais exemplos de requisições estão em `endpoin.http` (funciona com a extensão REST Client do VS Code).

## Status do projeto

- API REST funcionando com CRUD completo.
- A interface (`index.html` e `style.css`) tem o layout pronto. A lógica em JavaScript que conecta a tela à API (`script.js`) ainda será adicionada.

## Próximos passos

- Adicionar o `script.js` para ligar a interface à API.
- Validar os dados recebidos (título e descrição obrigatórios).
- Trocar a coluna `concluido` por tipo `BOOLEAN` no banco.
- Publicar a aplicação online.

## Autor

Bernardo Ryu Takeda Kakuta
[LinkedIn](https://www.linkedin.com/in/bernardoryu-takeda-kakuta-415227269) · [GitHub](https://github.com/bernardotakeda)
