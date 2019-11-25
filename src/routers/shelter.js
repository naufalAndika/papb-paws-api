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

router.get('/shelters', async (req, res) => {
  try {
    const response = await shelterService.list()
    res.status(200).send(response)
  } catch (e) {
    console.log(e);
    
    res.status(500).send()
  }
})

router.get('/shelters/:id', async (req, res) => {
  try {
    const response = await shelterService.findById(req.params.id)
    console.log(response)
    const notFound = response === null

    if (notFound) {
      res.status(404).send()
    }

    res.status(200).send(response)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
