# PaseTec – _Web_

[Create React App](https://facebook.github.io/create-react-app/) with a Service Worker and an [Express]([https://expressjs.com/](https://expressjs.com/)) API that communicates to a [Prisma](https://www.prisma.io/) database, all uploaded to [Now](https://zeit.co/now).

## Setup

You'll need [Node](https://nodejs.org/en/) AND [Yarn](https://yarnpkg.com/en/) installed.

```bash
# Install Now
$ yarn global add now
$ now login

$ cd pasetec/web
$ yarn install
```

### File Structure

```
web/
|-- api/
|-- prisma/
|-- public/
|-- src/
  |-- App.js
  |-- service-worker.js
|-- .env
|-- now.json
```

- **`api/`**: Each API endpoint (Express)
- **`prisma/`**: Prisma datamodel and JavaScript client
- **`public/`**: Public files of Create React App
- **`App.js`**: Create React App home
- **`service-worker.js`**: [Workbox](https://developers.google.com/web/tools/workbox/) service worker
- **`.env`**: There go the env vars. Follow `.env.example` to create it
- **`now.json`**: Now configuration. Make sure to replace the secrets!

## Running

Run `$ now dev`. More info about it [here](https://zeit.co/blog/now-dev).

## Building

Run `$ now --target production`. More info about it [here](https://zeit.co/docs/v2/getting-started/introduction-to-now/).
