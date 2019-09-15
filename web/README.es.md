[English](README.md) | Español

# PaseTec – _Web_

[Create React App](https://facebook.github.io/create-react-app/) con un Service Worker y una API en [Express]([https://expressjs.com/](https://expressjs.com/)) que se comunica con una base de datos [Prisma](https://www.prisma.io/), todo subido a [Now](https://zeit.co/now).

## Preparación

Necesitás tener [Node](https://nodejs.org/en/) Y [Yarn](https://yarnpkg.com/en/) instalados.

```bash
# Instalá Now
$ yarn global add now
$ now login

$ cd pasetec/web
$ yarn install
```

### Estructura de Archivos

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

- **`api/`**: Cada endpoint de la API (Express)
- **`prisma/`**: Archivos de Prisma, con su cliente de JavaScript
- **`public/`**: Archivos públicos de Create React App
- **`App.js`**: Inicio de Create React App
- **`service-worker.js`**: Service Worker de [Workbox](https://developers.google.com/web/tools/workbox/)
- **`.env`**: Acá van las variables de entorno. Seguí `.env.example` para crearlo
- **`now.json`**: Configuración de Now. ¡Asegurate de reemplazar los secretos!

## Desarrollo

Ejecutá `$ now dev`. Más información [acá](https://zeit.co/blog/now-dev).

## Compilado

Ejecutá `$ now --target production`. Más información [acá](https://zeit.co/docs/v2/getting-started/introduction-to-now/).