# 🏦 Projeto Financeiro — Next.js + TypeScript + Module Federation

Este projeto é uma aplicação financeira construída com **Next.js** e **TypeScript**, utilizando **Module Federation**, **Docker**, **AWS** para deploy, com **SSG (Static Site Generation)** para melhor performance e **Redux** para gerenciamento de estado.

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
