const { text, send } = require('micro')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = async (req, res) => {
  if (req.headers.secret !== process.env.SECRET)
    return send(res, 401, { error: 'Invalid Secret' })

  const uid = await text(req)

  try {
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

    res.send(`viajes:${user.viajes}!`)
  } catch (error) {
    res.send(error)
  }
}
