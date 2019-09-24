const express = require('express')
const bodyParser = require('body-parser')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = app = express()

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null)
    return res.status(400).send({ error: 'no JSON object in the request' })
  if (req.header('Secret') !== process.env.SECRET)
    return res.status(401).send({ error: 'invalid secret' })
  res.set('Content-Type', 'application/json')
  ;(async () => {
    try {
      const metadata = await prisma.createMetadata({
        date: new Date(),
        ...req.body,
      })

      res.send(metadata)
    } catch (error) {
      res.send({ error })
    }
  })()
})
