const express = require('express')

const server = express()

// Invoke middleware
server.use(express.json())
server.use(logger)

server.use(`/`, (req, res) => {
  let nameInsert = ''
  res.send(`
    <h2>Node Blog API</h2>
    <p>Welcome${nameInsert} to my Node Blog API</p>
  `);
})

// Custom Middleware
function logger(req, res, next) {
  const { method, url } = req
  // Capture request information
  let requestLog = {
    type: method,
    url,
    timestamp: Date.now()
  }

  console.log(`Request log: ${JSON.stringify(requestLog)}`)
  next()
};

module.exports = server;
