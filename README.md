# monorepo-template

Todo:
- global vite,
- server vitest
- global tsconfigs

**Monorepo Template** powered with:
- `React` with `Zustand` state management, `React Query`, `Vite` bundler
- `Material-UI (MUI)` for a clean and responsive design.
- `Node.js` with `Express` routing
- `Typescript` typings
- `Docker` `Swarm` configurations
- `Pino` for structured logs and debugging, `Zod` validation
- `I18next` localisation support
- `ESLint` lint, fix, coverage
- `Prettier` lint, fix, organize imports
- Pre-commit `hook` with lint and test
- `Editor config`
- `Playwright`, `Vitest`, `Supertest` and `Jest` unit and e2e tests and coverage
- `NPM` check updates

## Tech Stack
- **Client**: React 19, Zustand, Vite, Material UI, I18next, React Query
- **Server**: Node.js, Express, Typescript, Pino, Zod
- **Database**: Postgres, Drizzle
- **Testing**: Playwright, Vitest, Supertest, Jest
- **Deployment**: Docker, Docker Swarm
- **Code Quality**: ESLint, Prettier, pre-commit hooks, lint-staged

## Commands

### Installation

Install [Docker](https://docs.docker.com/get-docker/) and NPM dependencies (**Steps 1-2**)

`brew install --cask docker` Install Docker using [brew](https://brew.sh/) example (**Step 1**)

`pnpm install` Install NPM dependencies (**Step 2**)

### Development

Start app in Development mode with hot reload (**Step 1**).
The app will be available at `http://localhost:4200`.

`pnpm start` Start client, server, Postgres service and prepares database with mock data (**Step 1**)

`pnpm start:client` Start client

`pnpm start:server` Start server

`pnpm on:stop` Run on-stop scripts

### Testing

Run the app in Development mode (**Step 1**) and Production mode (**Steps 1-2**) first

`pnpm test` Run client, server and e2e tests

`pnpm test:e2e` Run end-to-end tests

`pnpm test:e2e:local` Run end-to-end tests for local environment

`pnpm test:e2e:docker` Run end-to-end tests for Docker environment

`pnpm test:client` Run client tests

`pnpm test:server` Run server tests

`pnpm test:watch` Run client and server tests in watch mode

`pnpm test:watch:client` Run client tests in watch mode

`pnpm test:watch:server` Run server tests in watch mode

`pnpm test:coverage` Run client and server tests coverage report

`pnpm test:client:coverage` Run client tests coverage report

`pnpm test:server:coverage` Run server tests coverage report

### Build

Build client and server

`pnpm run build` Build client and server

`pnpm run build:client` Build client

`pnpm run build:server` Build server

### Production

Start app in Production mode in Docker environment (**Steps 1-2**). 
The app will be available at `http://localhost:4300`.

`pnpm docker:build` Build Docker images (**Step 1**)

`pnpm docker:deploy` Deploy Docker containers (**Step 2**)

`pnpm docker:rm` Remove Docker containers

`pnpm docker:init` Init Docker

`pnpm docker:status` Show Docker status

`pnpm docker:logs` Show Docker logs

`pnpm docker:prune` Prune Docker containers

### Code quality

Code quality checks and fixes

`pnpm lint` Run code quality checks

`pnpm lint:fix` Run code quality fixes

`pnpm run update` Update libraries to the latest versions

## API Endpoints

- **`GET /api/items`**: Fetch all available items.

- **`POST /api/items`**: Create a new item.

- **`PUT /api/items`**: Update an existing item.

- **`DELETE /api/items`**: Delete an item.