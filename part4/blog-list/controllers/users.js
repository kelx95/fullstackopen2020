const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  if (body.password.length >= 3) {
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } else {
    response.status(400).send({ error: 'User validation failed: password: Path `passord is shorter than the minimum allowed length (3).' })
  }
})

module.exports = userRouter