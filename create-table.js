import { query } from './database.js';

const createTableSQL = `
  CREATE TABLE projetos (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL, 
    descricao VARCHAR(255) NOT NULL,
    concluido varchar(7)
  );
`;

query(createTableSQL)
     .then(() => {
          console.log('Tabela criada com sucesso');
     })
     .catch((err) => {
          console.error('Erro ao criar tabela:', err);
     });
