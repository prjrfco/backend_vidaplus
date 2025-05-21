<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Projeto de estudo para cumprir a atividade prática da disciplina de "Projeto: Desenvolvimento Back-end" da faculdade UNINTER.

Aluno: Francisco Paes Ramos Junior.

Ru: 4369402

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

#### PRÉ-REQUISITOS:
Ter Instalado:
```
NODE 20.11.1
BANCO DE DADOS PostgreSQL
Yarn
```

#### CONFIGURAR VARIÁVEIS DE AMBIENTE:

Encontrar o arquivo ```.env.example``` na raiz do projeto,
duplicar o mesmo e renomear o novo arquivo para ```.env```.

Criar um banco um vazio utilizando o PostgreSQL e adicionar as informações das propriedades do banco criado ao arquivo ```.env``` criado anteriormente.

Preencher o arquivo ``.env`` conforme exemplo:
```
# API PORT 
APP_PORT=4007 ==> Porta disponível em seu sistema

# DATABASE Server connection
DATABASE_PORT=5432 # Porta do seu banco
DATABASE_HOST=localhost # Host do seu banco
DATABASE_USER=postgres # Usuário do seu banco
DATABASE_PASSWORD=postgres  # Senha do seu banco
DATABASE_NAME=vidaplusdb # Nome do banco criado por você para poder subir as migrações e realizar consultas e persistências ao executar o projeto
```

## Executar para instalar as dependências:
```bash
$ yarn install
```

## Executar para subir o projeto em modo de desenvolvimento

```bash
# development
$ yarn start:dev
```

## Executar para subir o projeto em modo de debug

```bash
# watch mode
$ yarn start:debug
```

## Executar para gerar uma nova build

```bash
$ yarn build
```

## Link documentação POSTMAN

```
https://drive.google.com/file/d/1GuV0QViK4vClPoxKlEEzNrNJ2j3x7wus/view?usp=sharing
```