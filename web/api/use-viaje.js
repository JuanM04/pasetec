const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.text())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send('missing body')
  if (req.header('Secret') !== process.env.SECRET) return res.status(401).send({ error: 'invalid secret' })
  res.set('Content-Type', 'text/plain')



  const uid = req.body

  prisma.user({ uid })
    .then(user => {
      if(!user) throw 'error!'
      if(!user.viajes) throw 'viajes:-1!'

      return prisma.updateUser({
        data: { viajes: user.viajes - 1 },
        where: { id: user.id }
      })
    })
    .then(user => {
      prisma.createLog({
        user: { connect: { id: user.id } },
        type: 'VIAJE_USED',
        date: new Date(),
        data: { initialViajes: user.viajes + 1 }
      }).then(() => res.send(`viajes:${user.viajes}!`))
    })
    .catch(error => res.send(error))
})