import express from 'express';
import cors from 'cors';
import { DatabaseProjetos} from './services.js';

const app = express();
const database = new DatabaseProjetos();

app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.listen(3333, () => {
     console.log('Servidor rodando na porta 3333');
});

//----------------ROTAS--DO--CRUD---------------------//


// Criar (rota POST)

app.post('/projetos', async (req, res) => {
     try {
          const body = req.body;
          await database.createProjeto(body);
          res.status(201).send("Projeto criado com sucesso!");
     } catch (error) {
          console.error("Erro ao criar projeto!", error);
          res.status(500).send("Erro ao criar projeto.");
     }
});

// Mostrar os projetos (rota GET)

app.get('/projetos', async (req, res) => {
     try {
          const projetos = await database.listProjetoByNaoConcluido();
          res.status(200).json(projetos);
     } catch (error) {
          console.error("Erro ao buscar projetos!", error);
          res.status(500).send("Erro ao buscar projetos.");
     }
});
app.get('/projetos/concluidos', async (req, res) => {
     try {
          const projetos = await database.listProjetoByConcluido();
          res.status(200).json(projetos);
     } catch (error) {
          console.error("Erro ao buscar projetos!", error);
          res.status(500).send("Erro ao buscar projetos.");
     }
});

// Mostrar projeto por ID (rota GET com ID)

app.get("/projetos/:id", async (req, res) => {
     try {
          const projetoID = req.params.id;
          const projeto = await database.listProjetoByID(projetoID);
          if (projeto.length > 0) {
               res.status(200).json(projeto);
          } else {
               res.status(404).send("Projeto não encontrado.");
          }
     } catch (error) {
          console.error("Erro ao buscar projeto por ID!", error);
          res.status(500).send("Erro ao buscar projeto por ID.");
     }
});

// Deletar projeto (rota DELETE)

app.delete("/projetos/:id", async (req, res) => {
     try {
          const projetoID = req.params.id;

          await database.deleteProjeto(projetoID);
          res.status(200).send("Projeto deletado com sucesso.");
     } catch (error) {
          if (error.message === 'Projeto não encontrado') {
               res.status(404).send("Projeto não encontrada.");
          } else {
               console.error("Erro ao deletar projeto!", error);
               res.status(500).send("Erro ao deletar projeto.");
          }
     }
});


// Atualizar projeto (rota PUT)
app.put('/projetos/:id', async (req, res) => {
     try {
          const projetoID = req.params.id;
          const { titulo, descricao, concluido } = req.body;

          const alteracoes = {
               titulo,
               descricao,
               concluido: concluido !== undefined ? concluido : false,
          };

          console.log('Atualizando projeto:', projetoID, alteracoes);

          await database.updateProjeto(projetoD, alteracoes);
          res.status(200).send("Projeto atualizado com sucesso.");
     } catch (error) {
          if (error.message === 'Projeto não encontrada') {
               res.status(404).send("Projeto não encontrado.");
          } else {
               console.error("Erro ao atualizar projeto!", error);
               res.status(500).send("Erro ao atualizar projeto.");
          }
     }
});

app.put('/concluir/:id', async (req, res) => {
     try {
          const projetoID = req.params.id;
          await database.concluirProjeto(projetoID);
          res.status(200).send("Projeto concluída com sucesso.");
     } catch (error) {
          if (error.message === 'Projeto não encontrada') {
               res.status(404).send("Projeto não encontrada.");
          } else {
               console.error("Erro ao concluir projeto!", error);
               res.status(500).send("Erro ao concluir projeto.");
          }
     }
});