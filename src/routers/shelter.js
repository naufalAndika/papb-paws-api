const express = require('express')
const router = new express.Router()
const shelterService = require('../services/shelter/index')
const auth = require('../middleware/auth')

router.post('/shelters', auth, async (req, res) => {
  try {
    const response = await shelterService.create({
      ...req.body,
      owner: req.user
    })
    res.status(201).send(response)
  } catch (e) {
    res.status(400).send(e)
  } 
})

module.exports = router
