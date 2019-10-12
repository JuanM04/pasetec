import { text } from 'micro'
import { prisma } from 'prisma'
import { IncomingMessage, OutgoingMessage } from 'http'

export default async (req: IncomingMessage, res: OutgoingMessage) => {
  try {
    if (req.headers.secret !== process.env.SECRET) throw 'error!'
    const uid = await text(req)

    let user = await prisma.user({ uid })
    if (!user) throw 'error!'
    if (!user.viajes) throw 'viajes:-1!'

    user = await prisma.updateUser({
      data: { viajes: user.viajes - 1 },
      where: { id: user.id },
    })

    await prisma.createLog({
      user: { connect: { id: user.id } },
      type: 'VIAJE_USED',
      date: new Date(),
      data: { initialViajes: user.viajes + 1 },
    })

    res.end(`viajes:${user.viajes}!`)
  } catch (error) {
    res.end(error)
  }
}
