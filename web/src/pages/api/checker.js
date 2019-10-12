const { text, send } = require('micro')
const { prisma } = require('prisma')

module.exports = async (req, res) => {
  if (req.headers.secret !== process.env.SECRET) throw 'error!'

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
