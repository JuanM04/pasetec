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

  ;(async () => {
    try {
      let oldUser, newUser
      let user = await prisma.user({ id })
      if (!user) throw 'El usuario no se ha encontrado'

      oldUser = user
      let newData = req.body
      delete newData.id

      newUser = await prisma.updateUser({
        data: newData,
        where: { id }
      })

      await prisma.createLog({
        user: { connect: { id } },
        type: 'USER_UPDATED',
        date: new Date(),
        data: { oldUser, newUser }
      })

      res.send(newUser)
    } catch (error) {
      res.send({ error })
    }
  })()
})