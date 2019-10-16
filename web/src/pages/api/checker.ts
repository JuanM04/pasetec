import { text } from 'micro'
import { prisma } from 'prisma'
import { IncomingMessage, OutgoingMessage } from 'http'

export default async (req: IncomingMessage, res: OutgoingMessage) => {
  try {
    if (req.headers.secret !== process.env.SECRET) throw 'error!'
    const uid = await text(req)

    let user = await prisma.user({ uid })
    if (!user) throw 'error!'

    const metadata = await prisma.metadatas({
      orderBy: 'date_ASC',
      last: 1,
    })

    res.end(`res:${user.viajes}-${metadata[0].viajePrice}!`)
  } catch (error) {
    res.end(error)
  }
}
