const express = require('express')
const router = new express.Router()
const userService = require('../services/user/index')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
  try {
    const response = await userService.create(req.body)
    res.status(201).send(response)
  } catch (e) {
    res.status(400).send(e)
  } 
})

router.post('/users/login', async (req, res) => {
  try {
    const response = await userService.login(req.body.username, req.body.password)
    res.status(200).send(response)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.status(200).send(req.user)
})

module.exports = router
