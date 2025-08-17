# Dosham (Angular Web Client)

> Angular frontend for the **Chechen Language Dictionary** ecosystem. This app connects to the public **Chldr API** to search and browse Chechen words and multi‑word expressions.

> *Current deployment* https://dosham.app

---

## ✨ Overview

This repository contains an Angular SPA that serves as the web client for the Dosham project. It focuses on fast search, clean typography, and a distraction‑free reading experience for translations and examples. The backend is provided by the **Chldr** service (see the API repository for models and contract).

* **Domain**: Chechen → Russian (and other language pairs where data exists)
* **Entities**: `Entry` (types: `WORD`, `TEXT`), `Translation`, `Source`
* **Goal**: high‑quality dictionary lookups with transparent sources for each translation

> The original short README states: “This is a web client for the Chldr API… I rely on your integrity not to misuse anything in this repository.” Treat this code as “source‑available” with respect to reuse.

---

## 🧱 Tech Stack

* **Angular** (TypeScript)
* **RxJS** for async data flows
* **SCSS** for styles
* **GraphQL** client (via standard HTTP fetch or your preferred Angular GraphQL lib)

---

## 🚀 Getting Started (Local Development)

### Prerequisites

* **Node.js** LTS (v18 or v20 recommended)
* **npm** v10+

### 1) Clone & install

```bash
git clone https://github.com/movsar/dosham-angular.git
cd dosham-angular
npm ci   # or: npm install
```

### 2) Configure API endpoint

Set the GraphQL endpoint for the Chldr API.

Typical options:

* `src/environments/environment.ts` / `environment.prod.ts` (Angular standard), or
* a small `config.ts` in `src/app/` that exports `apiUrl`.

> Use: `https://api.dosham.app/v2/graphql` for the current public endpoint.

### 3) Start the dev server

```bash
npm start          # or: ng serve
```

Open **[http://localhost:4200](http://localhost:4200)**.

### 4) Production build

```bash
npm run build      # produces /dist output
```

Host the `/dist` folder with any static web server or behind Nginx.

---

## 🔎 Features

* **Instant Search** for words and phrases (Entry types: `WORD`, `TEXT`).
* **Per‑translation Sources**: each translation is attributed to a source (e.g., Maciev, Malaev, domain‑specific dictionaries, or user submissions).
* **Clean Reading View**: minimal UI for reading headwords, transliteration/notes (where applicable), and translations.
* **Keyboard & Mobile Friendly**: fast navigation, responsive layout.

> Note: exact feature availability depends on dataset and API responses. See the Chldr API for the source of truth of models.

---

## 🧩 Project Structure (high level)

```
.vscode/                 # editor settings
src/
  app/
    components/          # UI components
    pages/               # routed screens
    services/            # API & domain logic (GraphQL/http)
    models/              # TS interfaces mirroring API types
  assets/                # static assets
  styles/                # global SCSS
angular.json             # Angular workspace config
package.json             # scripts & deps
```

---

## ⚙️ Configuration

Create/adjust environment files as needed:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://api.dosham.app/v2/graphql'
};
```

For production builds, set `environment.prod.ts` accordingly.

If the app uses a dedicated GraphQL client, configure the HTTP link to `environment.apiUrl` and enable `fetchPolicy: 'cache-first'` (or your preference).

---

## 🧪 Testing

Typical Angular setup:

```bash
npm test       # unit tests (Karma/Jasmine)
npm run lint   # static analysis (ESLint)
```

---

## 🗺️ Related Repositories

* **API & Backend (Chldr)**: [https://github.com/movsar/chldr.api](https://github.com/movsar/chldr.api)
* **Android (offline)**: [https://github.com/movsar/dosham-android](https://github.com/movsar/dosham-android)

Public website: [https://dosham.app](https://dosham.app)

---

## 🤝 Contributing

Contributions that improve code quality, performance, accessibility, or internationalization are welcome. Please:

1. Fork the repo, create a feature branch.
2. Keep commits focused and well‑described.
3. Open a PR with screenshots and notes.

> Data additions/edits should target the backend (API / content ingestion). Frontend PRs should keep the UI simple and consistent.

---

## 📄 License & Usage

Copyright (c) Movsar Bekaev (movsar.dev@gmail.com)
Treat the code as source‑available. If you plan to reuse substantial parts, **ask for permission** and provide credit with a link to **dosham.app**.
