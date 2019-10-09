import { ApolloError, AuthenticationError } from 'apollo-server-micro'
import { prisma } from 'prisma'

const checkAuth = authed => {
  if (!authed) throw new AuthenticationError('Inavlid Secret')
}

export default {
  Query: {
    getUser: async (_, { id, uid, dni }) => await prisma.user({ id, uid, dni }),
    getMetadata: async () => {
      const metadatas = await prisma.metadatas({ orderBy: 'date_ASC', last: 1 })
      return metadatas[0]
    },
  },
  Mutation: {
    addViajes: async (_, { id, uid, dni, newViajes }, { authed }) => {
      checkAuth(authed)
      let user = await prisma.user({ id, uid, dni })
      if (!user) throw new ApolloError('El usuario no se ha encontrado')

      user = await prisma.updateUser({
        data: { viajes: user.viajes + newViajes },
        where: { id: user.id },
      })

      await prisma.createLog({
        user: { connect: { id: user.id } },
        type: 'VIAJES_ADDED',
        date: new Date(),
        data: {
          initialViajes: user.viajes - newViajes,
          viajesAdded: newViajes,
        },
      })

      return user.viajes
    },
    createUser: async (_, { uid, dni }, { authed }) => {
      checkAuth(authed)
      const userExists = await prisma.$exists.user({
        OR: [{ uid }, { dni }],
      })
      if (userExists)
        throw new ApolloError('El UID o el DNI ya existen en la base de datos')

      const user = await prisma.createUser({ uid, dni, viajes: 0 })

      await prisma.createLog({
        user: { connect: { id: user.id } },
        type: 'USER_CREATED',
        date: new Date(),
        data: { uid, dni },
      })

      return user
    },
    updateUser: async (_, { id, uid, dni, viajes }, { authed }) => {
      checkAuth(authed)
      let oldUser, newUser
      let user = await prisma.user({ id })
      if (!user) throw new ApolloError('El usuario no se ha encontrado')

      oldUser = user
      let newData = { uid, dni, viajes }

      newUser = await prisma.updateUser({
        data: newData,
        where: { id },
      })

      await prisma.createLog({
        user: { connect: { id } },
        type: 'USER_UPDATED',
        date: new Date(),
        data: { oldUser, newUser },
      })

      return newUser
    },
    updateMetadata: async (_, { pasePrice, viajePrice }, { authed }) => {
      checkAuth(authed)
      return await prisma.createMetadata({
        date: new Date(),
        pasePrice,
        viajePrice,
      })
    },
  },
}
