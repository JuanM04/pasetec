const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send({ error: 'no JSON object in the request' })
  if (req.header('Secret') !== process.env.SECRET) return res.status(401).send({ error: 'invalid secret' })
  res.set('Content-Type', 'application/json')



  const { id } = req.body
  const newViajes = parseInt(req.body.newViajes)

  ;(async () => {
    try {
      let user = prisma.user({ id })
      if(!user) throw 'El usuario no se ha encontrado'
  
      user = await prisma.updateUser({
        data: { viajes: user.viajes + newViajes },
        where: { id: user.id }
      })
  
      await prisma.createLog({
        user: { connect: { id: user.id } },
        type: 'VIAJES_ADDED',
        date: new Date(),
        data: {
          initialViajes: user.viajes - newViajes,
          viajesAdded: newViajes
        }
      })
  
      res.send({ viajes: user.viajes })
    } catch (error) {
      res.send({ error })
    }
  })()
})