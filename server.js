const express = require('express')

const server = express()
server.use(express.json())

server.use(`/`, (req, res) => {
  let nameInsert = ''
  res.send(`
    <h2>Node Blog API</h2>
    <p>Welcome${nameInsert} to my Node Blog API</p>
  `);
})

// Custom Middleware
function logger(req, res, next) {

};

module.exports = server;
