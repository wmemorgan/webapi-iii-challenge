require('dotenv').config()
const server = require('./server')

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`My Node Blog API server running on port ${PORT}`)
})
