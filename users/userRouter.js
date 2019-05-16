const express = require('express')
const db = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router()

const idContentSubmissionCheck = [validateUserId, validatePost]

router.post('/', validateUser, async (req, res) => {
  try {
    let data = await db.insert(req.body)
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).json({ message: `Error adding new user: ${JSON.stringify(err)}`})
  }
});

router.post('/:id/posts', idContentSubmissionCheck, async (req, res) => {
  try {
    const user = await Posts.insert(req.body)
    res.send(user)
  }
  catch (err) {
    res.status(500).json({ message: `Error in adding a post` })
  }
})

router.get('/', async (req, res) => {
  try {
    let data = await db.get()
    res.send(data)
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
})

router.get('/:id', validateUserId, (req, res) => {
  res.send(req.user)
})

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const userPosts = await db.getUserPosts(req.user.id)
    res.send(userPosts)
  }
  catch (err) {
    res.status(500).json({ message: `Error retrieving user posts`})
  }
})

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deleteCount = await db.remove(req.user.id)
    if (deleteCount > 0) {
      res.json({ message: `User ${req.user.id} deleted` })
    } else throw err
  }
  catch (err) {
    res.status(500).json({ message: `Error deleting user` })
  }
})

router.put('/:id', idContentSubmissionCheck, async (req, res) => {
  try {
    const updateCount = await db.update(req.user.id, req.body)
    if (updateCount > 0) {
      const updatedUser = await db.getById(req.user.id)
      res.json(updatedUser)
    } else throw err
  }
  catch (err) {
    res.status(500).json({ message: `Error updating user` })
  }
})

// Custom Middleware
async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    const user = await db.getById(id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: `invalid user id` })
    }
  }
  catch (err) {
    res.status(500).json({ message: `Failed to process request` })
  }
}

function validateUser(req, res, next) {
  // Validate non-empty body
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data"})
  } else if (!req.body.name) {   // Validate name field
    res.status(400).json({ message: "missing required name field"})
  } else { // Proceed with executing the rest of the route
    next()
  }
}

function validatePost(req, res, next) {
  // Validate non-empty body
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.text) {   // Validate name field
    res.status(400).json({ message: "missing required text field" })
  } else { // Proceed with executing the rest of the route
    next()
  }
}

module.exports = router;
