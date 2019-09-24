const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null)
    return res.status(400).send({ error: 'no JSON object in the request' })
  res.set('Content-Type', 'application/json')
  ;(async () => {
    try {
      const metadata = await prisma.metadatas({
        orderBy: 'date_ASC',
        last: 1,
      })

      res.send(metadata[0])
    } catch (error) {
      res.send({ error })
    }
  })()
})
