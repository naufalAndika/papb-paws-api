const express = require('express')
const router = new express.Router()
const shelterService = require('../services/shelter/index')

router.post('/shelters', async (req, res) => {
  try {
    const response = await shelterService.create(req.body)
    res.status(201).send(response)
  } catch (e) {
    res.status(400).send(e)
  } 
})

module.exports = router
