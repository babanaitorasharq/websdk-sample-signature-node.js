require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')

const API_KEY = Y_mxPUvuQwGARB1_hO3yUw
const API_SECRET = U7d5h0Y4l85acOpKFeARwnKtCf86eDoD35L3

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors());

app.post('/', (req, res) => {

  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(process.env.API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.json({
    signature: signature
  })
})

app.listen(port, () => console.log(`Zoom Web SDK Sample Signature Node.js on port ${port}!`))
