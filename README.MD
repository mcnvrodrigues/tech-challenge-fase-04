# 🏦 Projeto Financeiro — Next.js + TypeScript + Module Federation

Este projeto é uma aplicação financeira construída com **Next.js** e **TypeScript**, utilizando **Module Federation**, **Docker**, **AWS** para deploy, com **SSG (Static Site Generation)** para melhor performance e **Redux** para gerenciamento de estado.

---

O projeto foi refatorado com foco em:

- modularização;
- escalabilidade;
- separação de responsabilidades;
- Clean Architecture;
- compartilhamento de componentes;
- gerenciamento global de estado.

---

## 🧱 Clean Architecture

O projeto foi reorganizado utilizando separação em camadas:

src/modules

---
### Estrutura

```
modules/
├── domain
├── infrastructure
├── presentation
└── state
```

### Domain

Regras de negócio e entidades.

### Infrastructure

Persistência e integrações.

### Presentation

Componentes, páginas e hooks.

### State

Gerenciamento global de estado.

---

## 📦 Funcionalidades
- Cadastro de transações
- Edição de transações
- Exclusão de transações
- Controle de saldo
- Persistência local
- Filtros por categoria
- Filtros por período
- Compartilhamento de componentes entre microfrontends

---

## 💾 Persistência

Os dados são armazenados localmente utilizando:

```localStorage```

Chave utilizada:

``` transactions:v1 ```

---

## 🛠️ Requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js >= 18
- NPM
- Docker
- Docker Compose

## ▶️ Executando com Docker

Na raiz do projeto execute:

``` docker compose up --build ```

## 🌐 Acesso da aplicação

### Host App

```http://localhost:3000```

### Remote App
```http://localhost:3001```

---

## 🚀 Tecnologias Utilizadas

* **Next.js** (com SSG)
* **TypeScript**
* **Module Federation**
* **Redux**
* **Docker**
* **AWS (Deploy)**
* **Node.js / NPM**

---

# 🧩 Arquitetura de Microfrontends

O projeto é dividido em dois módulos:

| Módulo       | Descrição                                    | Porta |
| ------------ | -------------------------------------------- | ------ |
| `host-app`   | Aplicação principal e roteamento             | 3000   |
| `remote-app` | Componentes e módulos compartilhados         | 3001   |

A comunicação entre os módulos é realizada utilizando:

```txt
@module-federation/nextjs-mf

---

## 🧩 Estrutura do Module Federation

O projeto é dividido em dois módulos:

| Módulo       | Descrição                          | Porta Local      |
| ------------ | ---------------------------------- | ---------------- |
| `host-app`   | App principal que consome o remote | `localhost:3000` |
| `remote-app` | Módulo remoto federado             | `localhost:3001` |

---

## 📦 Requisitos

Antes de iniciar, você precisa ter instalado:

* **Node.js** (versão recomendada: >= 18)
* **NPM** ou **Yarn**
* **Docker** (opcional para containerização)

---

## 🛠️ Como Rodar Localmente

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. Instale as dependências de cada módulo:

   Para o `host-app`:

   ```bash
   cd host-app
   npm install
   npm run dev
   ```

   Para o `remote-app` (em outra aba/terminal):

   ```bash
   cd remote-app
   npm install
   npm run dev
   ```

3. Acesse no navegador:

* **Host App:** [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy AWS

O deploy é realizado na **AWS**, utilizando os serviços adequados para:

* Build e deploy de aplicações Next.js
* Servir módulos federados remotamente
* Comunicação entre microfrontends

---

## 📦 Gerenciamento de Estado

O projeto utiliza **Redux** para controle de estado global, garantindo consistência entre módulos e melhor escalabilidade.

---

## ⚡ Performance

Com o uso de **SSG (Static Site Generation)** sempre que possível, o projeto entrega:

* Melhor performance
* SEO otimizado
* Redução de custos operacionais

---