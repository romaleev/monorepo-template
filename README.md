# monorepo-template

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
- Pre-commit `hook` with lint staged
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

`npm install` Install NPM dependencies (**Step 2**)

### Development

Start app in Development mode with hot reload (**Step 1**).
The app will be available at `http://localhost:4200`.

`npm run start` Start client, server, Postgres service and prepares database with mock data (**Step 1**)

`npm run start:client` Start client

`npm run start:server` Start server

`npm run on:stop` Run on-stop scripts

### Testing

Run the app in Development mode (**Step 1**) and Production mode (**Steps 1-3**) first

`npm run test` Run client, server and e2e tests

`npm run test:e2e` Run end-to-end tests

`npm run test:e2e:local` Run end-to-end tests for local environment

`npm run test:e2e:docker` Run end-to-end tests for Docker environment

`npm run test:client` Run client tests

`npm run test:server` Run server tests

`npm run test:watch` Run client and server tests in watch mode

`npm run test:watch:client` Run client tests in watch mode

`npm run test:watch:server` Run server tests in watch mode

`npm run test:coverage` Run client and server tests coverage report

`npm run test:client:coverage` Run client tests coverage report

`npm run test:server:coverage` Run server tests coverage report

### Build

Build client and server

`npm run build` Build client and server

`npm run build:client` Build client

`npm run build:server` Build server

### Production

Start app in Production mode in Docker environment (**Steps 1-3**). 
The app will be available at `http://localhost:4200`.

`npm run docker:build` Build Docker images (**Step 1**)

`npm run docker:deploy` Deploy Docker containers (**Step 2**)

`npm run docker:rm` Remove Docker containers

`npm run docker:init` Init Docker

`npm run docker:status` Show Docker status

`npm run docker:logs` Show Docker logs

`npm run docker:prune` Prune Docker containers

### Code quality

Code quality checks and fixes

`npm run lint` Run code quality checks

`npm run lint:fix` Run code quality fixes

`npm run update` Update libraries to the latest versions

## API Endpoints

- **`GET /api/items`**: Fetch all available items.

- **`POST /api/items`**: Create a new item.

- **`PUT /api/items`**: Update an existing item.

- **`DELETE /api/items`**: Delete an item.