English | [Español](README.es.md)

# PaseTec – _Web_

[Create React App](https://facebook.github.io/create-react-app/) with a Service Worker and an [Micro](https://github.com/zeit/micro) and [GraphQL](https://graphql.org/) (with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [graphql.js](https://github.com/f/graphql.js)) API that communicates to a [Prisma](https://www.prisma.io/) database, all uploaded to [Now](https://zeit.co/now).

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
|-- api/
  |-- graphql/
|-- prisma/
|-- public/
|-- src/
  |-- App.js
  |-- service-worker.js
|-- .env
|-- now.json
```

- **`api/`**: Each API endpoint (Mirco)
- **`graphql/`**: Apollo Server
- **`prisma/`**: Prisma datamodel and JavaScript client
- **`public/`**: Public files of Create React App
- **`App.js`**: Create React App home
- **`service-worker.js`**: [Workbox](https://developers.google.com/web/tools/workbox/) service worker
- **`.env`**: There go the env vars. Follow `.env.example` to create it
- **`now.json`**: Now configuration. Make sure to replace the secrets!

## Developing

Run `$ now dev`. More info about it [here](https://zeit.co/blog/now-dev).

## Building

Run `$ now --target production`. More info about it [here](https://zeit.co/docs/v2/getting-started/introduction-to-now/).
