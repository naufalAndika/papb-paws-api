const express = require('express')
const router = new express.Router()
const userService = require('../services/user/index')

router.post('/users', async (req, res) => {
  try {
    const response = await userService.create(req.body)
    res.status(201).send(response)
  } catch (e) {
    res.status(400).send(e)
  } 
})

module.exports = router
