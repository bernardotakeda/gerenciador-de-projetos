import { randomUUID } from "crypto";
import { query } from './database.js';

export class DatabaseProjetos {

     // Listar todos os projetos
     async listProjeto() {
          const results = await query('SELECT * FROM projetos');
          return results;
     };

     // Listar projeto por ID
     async listProjetoByID(id) {
          const projetos = await query('SELECT * FROM projetos WHERE id = ?', [id]);
          return projetos;
     }

     // Listar projetos não concluidos
     async listProjetoByConcluido() {
          const projetos = await query('SELECT * FROM projetos WHERE concluido = true');
          return projetos;
     }

     // Listar projetos não concluidos
     async listProjetoByNaoConcluido() {
          const projetos = await query('SELECT * FROM projetos WHERE concluido = false ');
          return projetos;
     }

     // Criar novo projeto
     async createProjeto(projeto) {
          const id = randomUUID();
          const { titulo, descricao, concluido } = projeto;

          await query(
               'INSERT INTO projetos (id, titulo, descricao, concluido) VALUES (?, ?, ?, ?, ?, ?)',
               [id, titulo, descricao, concluido]
          );
     }


     // Atualizar projeto por ID
     async updateProjeto(id, projeto) {
          const { titulo, descricao, concluido } = projeto;

          console.log("Dados para atualização:", projeto);

          const existe = await query('SELECT * FROM projetos WHERE id = ?', [id]);
          if (existe.length === 0) {
               throw new Error('Projeto não encontrado');
          }

          await query(
               'UPDATE projetos SET titulo = ?, descricao = ?, concluido = ? WHERE id = ?',
               [titulo, descricao, concluido ?? false, id]
          );
     }

     // Deletar projeto por ID
     async deleteProjeto(id) {
          const existe = await query('SELECT * FROM projetos WHERE id = ?', [id]);
          if (existe.length === 0) {
               throw new Error('Projeto não encontrado');
          }

          await query('DELETE FROM projetos WHERE id = ?', [id]);
     }

     // Marcar concluido

     async concluirProjeto(id) {
          const [projeto] = await query('SELECT * FROM projetos WHERE id = ?', [id]);

          if (!projeto) {
               throw new Error('Projeto não encontrada');
          }

          await query('UPDATE projetos SET concluido = true WHERE id = ?', [id]);
     }

}