# Instruções

## Desenvolvimento
* Crie o arquivo `.env`, utilizando como referência o arquivo `.env.example`: `cp .env.example .env`;
* Informe no arquivo `.env` as variáveis de ambiente, como credenciais, acesso de banco de dados, secrets, etc;
* Inicie um banco de dados postgresql;
* Execute:
```bash
yarn                         ## install
yarn typeorm migration:run   ## run migration
yarn dev:server              ## start dev server
```

## Produção
* Crie o arquivo `.env`, utilizando como referência o arquivo `.env.example`: `cp .env.example .env`;
* Informe no arquivo `.env` as variáveis do ambiente de produção. IMPORTANTE: você precisa alterar as variáveis
do TypeORM para usar o diretório de produção, substituindo `src` por `dist` e `*.ts` por `*.js`;
* Inicie um banco de dados postgresql;
* Execute:
```bash
yarn                         ## install
yarn build                   ## build with babel and webpack
yarn typeorm migration:run   ## run migrations
yarn start                   ## start server
```

## Banco de Dados
* Adicione as configurações nas variáveis de ambiente do seu banco de dados. De preferência, utilizado PostgreSQL, pois foi desenvolvido nele a API:
  * `TYPEORM_CONNECTION`;
  * `TYPEORM_HOST`;
  * `TYPEORM_USERNAME`;
  * `TYPEORM_PASSWORD`;
  * `TYPEORM_DATABASE`;
  * `TYPEORM_PORT`.

## Storage

* Para alterar o tipo de storage, entre disco local e aws, basta alterar a variável de ambiente `STORAGE_DRIVER`:
  * `disk`: Armazenamento local;
  * `s3`: Armazenamento S3.
* Caso seja colocado `s3`, alterar as variáveis de ambiente relacionados a `AWS` para o bucket s3 que será utilizado:
  * `AWS_ACCESS_KEY_ID`: id de acesso da aws;
  * `AWS_SECRET_ACCESS_KEY`: chave de acesso, relacionado com ID, da aws;
  * `AWS_DEFAULT_REGION`: região do bucket;
  * `AWS_BUCKET`: nome do bucket;

# Documentação da API

* [RESTful API Reference (insomnia)](docs/insomnia.json)

# Diagrama do Banco de dados

* [Diagrama](assets/dbdiagram.png)
