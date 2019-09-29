const { text, send } = require('micro')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = async (req, res) => {
  if (req.headers.secret !== process.env.SECRET)
    return send(res, 401, { error: 'Invalid Secret' })

  const uid = await text(req)

  try {
    let user = await prisma.user({ uid })
    if (!user) throw 'error!'

    const metadata = await prisma.metadatas({
      orderBy: 'date_ASC',
      last: 1,
    })

    res.send(`res:${user.viajes}-${metadata[0].viajePrice}!`)
  } catch (error) {
    res.send(error)
  }
}
