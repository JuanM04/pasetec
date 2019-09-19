const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.text())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send('missing body')
  res.set('Content-Type', 'text/plain')



  const uid = req.body

  ;(async () => {
    try {
      let user = await prisma.user({ uid })
      if (!user) throw 'error!'

      const metadata = await prisma.metadatas({
        orderBy: 'date_ASC',
        last: 1
      })

      res.send(`res:${user.viajes}-${metadata[0].viajePrice}!`)
    } catch (error) {
      res.send(error)
    }
  })()
})