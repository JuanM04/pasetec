[English](README.md) | Español

# PaseTec – _Web_

[Next.js](https://nextjs.org) con un Service Worker y una API de [GraphQL](https://graphql.org/) (con [Apollo](https://www.apollographql.com/)) que se comunica con una base de datos [Prisma](https://www.prisma.io/), todo subido a [Now](https://zeit.co/now).

## Preparación

Necesitás tener [Node](https://nodejs.org/en/) Y [Yarn](https://yarnpkg.com/en/) instalados (más Now CLI y Prisma CLI).

```bash
# Instalá Now y Prisma
$ yarn global add now prisma
$ now login
$ prisma login

$ cd pasetec/web
$ yarn install
```

### Estructura de Archivos

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

- **`api/`**: Cada endpoint de la API (Micro)
- **`graphql/`**: Apollo Server
- **`pages/`**: Cada página de Next.js
- **`prisma/`**: Archivos de Prisma, con su cliente de JavaScript
- **`public/`**: Archivos públicos de Next.js
- **`.env`**: Acá van las variables de entorno. Seguí `.env.example` para crearlo
- **`next.config.js`**: Configuración ce Next.js
- **`now.json`**: Configuración de Now. ¡Asegurate de reemplazar los secretos!

## Desarrollo

Ejecutá `$ yarn dev`. Iniciará un servidor local de Next.js.

## Compilado

Ejecutá `$ now --prod`. Más información [acá](https://zeit.co/docs/v2/getting-started/introduction-to-now/).
