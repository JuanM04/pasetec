English | [Español](README.es.md)

# PaseTec – _Web_

[Next.js](https://nextjs.org) with a Service Worker and a [GraphQL](https://graphql.org/) (with [Apollo](https://www.apollographql.com/)) API that communicates to a [Prisma](https://www.prisma.io/) database, all uploaded to [Now](https://zeit.co/now).

## Setup

You'll need [Node](https://nodejs.org/en/) AND [Yarn](https://yarnpkg.com/en/) installed (plus Now CLI and Prisma CLI).

```bash
# Install Now and Prisma
$ yarn global add now prisma
$ now login
$ prisma login

$ cd pasetec/web
$ yarn install
```

### File Structure

```
web/
|-- prisma/
|-- public/
|-- src/
  |-- components/
  |-- pages/
    |-- api/
      |-- graphql/
  |-- utils/
|-- .env
|-- next.config.js
|-- now.json
```

- **`api/`**: Each API endpoint (Mirco)
- **`graphql/`**: Apollo Server
- **`pages/`**: Every Next.js page
- **`prisma/`**: Prisma datamodel and JavaScript client
- **`public/`**: Public files of Next.js
- **`.env`**: There go the env vars. Follow `.env.example` to create it
- **`next.config.js`**: Next.js configuration
- **`now.json`**: Now configuration. Make sure to replace the secrets!

## Developing

Run `$ yarn dev`. It will run a Next.js local server.

## Building

Run `$ now --prod`. More info about it [here](https://zeit.co/docs/v2/getting-started/introduction-to-now/).
