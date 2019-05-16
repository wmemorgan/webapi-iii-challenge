const server = require('./server')

const port = 4000

server.listen(port, () => {
  console.log(`My Node Blog API server running on port ${port}`)
})
