const express = require('express')
const userRoutes = require('./users/userRouter')
const server = express()

// Global middleware
server.use(express.json())
server.use(logger)

server.use(`/api/users`, userRoutes)
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
  console.log(`${method} ${url} ${Date.now()}`)
  next()
};

module.exports = server;
