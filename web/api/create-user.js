const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send({ error: 'no JSON object in the request' })
  if (req.header('Secret') !== process.env.SECRET) return res.status(401).send({ error: 'invalid secret' })
  res.set('Content-Type', 'application/json')
  


  const { uid, dni } = req.body

  prisma.$exists.user({
    OR: [ { uid }, { dni } ]
  })
    .then(userExists => {
      if(userExists) throw 'El UID o el DNI ya existen en la base de datos'
      return prisma.createUser({ uid, dni, viajes: 0 })
    })
    .then(user => {
      prisma.createLog({
        user: { connect: { id: user.id } },
        type: 'USER_CREATED',
        date: new Date(),
        data: { uid, dni }
      }).then(() => res.send(user))
    })
    .catch(error => res.send({ error }))
})