# Encurta URL API

A Encurta URL API é uma API simples construída com Fastify, PostgreSQL e Redis para encurtar URLs longas e rastrear métricas de acesso.

## Como usar

### Instalação

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone este repositório:

```bash
git https://github.com/AdrianoVolter/encur_URL.git

```
### Navegue até o diretório do projeto:

```bash
cd encur_URL
```

### Instale as dependências:

```bash
npm install
```

### Configure o PostgreSQL e o Redis editando os arquivos src/lib/postgres.ts e src/lib/redis.ts, respectivamente.

### Inicie o servidor:

```bash
npm run dev
```

## Endpoints

- GET /:code: Redireciona para a URL original correspondente ao código fornecido.
- GET /api/links: Retorna todos os links encurtados.
- POST /api/links: Encurta uma URL longa e retorna o código do link encurtado.
- GET /api/metrics: Retorna as métricas de acesso para os links encurtados.

## Tecnologias Utilizadas
Fastify: Framework web rápido e eficiente para Node.js.
PostgreSQL: Banco de dados relacional para armazenamento de links encurtados.
Redis: Banco de dados em memória para armazenamento de métricas de acesso.