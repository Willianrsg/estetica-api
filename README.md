# Framework Api
Descrição
Este repositório contém scripts para gerenciar e executar várias tarefas relacionadas ao projeto. O projeto é construído usando Node.js e utiliza ferramentas como Knex, Jest e Standard Version.

## Índice

- [Uso](#uso)
- [Scripts](#scripts)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

Para começar, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-nome/seu-projeto.git
cd seu-projeto
```
Instale as dependências do projeto:

```bash
npm install
```

## Uso
Certifique-se de configurar as variáveis de ambiente necessárias em um arquivo .env. Você pode usar o .env.dev fornecido como um modelo.

```bash
cp .env.example .env
```

Depois de configurar as variáveis de ambiente, você pode usar os scripts disponíveis para realizar várias tarefas.

## Scripts

start: Inicia o servidor com a configuração de produção.

```bash
npm start
```

dev: Inicia o servidor no modo de desenvolvimento usando o Nodemon.

```bash
npm run dev
```

processor: Inicia um processador no modo de desenvolvimento usando o Nodemon.

```bash
npm run processor
```

test: Executa os testes do Jest.

```bash
npm test
```

table:make: Cria um novo arquivo de migração para o banco de dados.

```bash
npm run table:make
```

seed:make: Cria um novo arquivo de seed para o banco de dados.

```bash
npm run seed:make
```
seed:specific: Executa um arquivo de seed específico.

```bash
npm run seed:specific
```

mg:unlock: Destrava as migrações.

```bash
npm run mg:unlock
```

mg:prod: Executa migrações para produção.

```bash
npm run mg:prod
```

rb:prod: Desfaz migrações para produção.

```bash
npm run rb:prod
```

mg:dev2: Executa migrações para desenvolvimento.

```bash
npm run mg:dev2
```

rb:dev: Desfaz migrações para desenvolvimento.

```bash
npm run rb:dev
```

sd:dev: Executa dados de seed para desenvolvimento.

```bash
npm run sd:dev
```

mg:dev: Executa migrações para desenvolvimento.

```bash
npm run mg:dev
```

release: Gera uma nova versão de release usando o Standard Version.

```bash
npm run release
```

model:make: Cria um novo modelo usando um script.

```bash
npm run model:make
```

facade:make: Cria uma nova fachada usando um script.

```bash
npm run facade:make
```

sd:make: Cria um novo seed usando um script.

```bash
npm run sd:make
```

test:make: Cria um novo teste usando um script.

```bash
npm run test:make
```

controller:make: Executa scripts para criar um modelo e uma fachada.

```bash
npm run controller:make
```

## Contribuição

Sinta-se à vontade para contribuir para este projeto. Crie problemas ou solicitações de pull conforme necessário.

## Licença

Este projeto está licenciado sob a Licença MIT.
