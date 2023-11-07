const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})