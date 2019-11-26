const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const postService = require('../services/post/index')

router.post('/posts', auth, upload.single('photo'), async (req, res) => {
  const data = {
    ...req.body,
    photo: req.file.buffer,
    owner: req.user
  }
  data.foundAt = JSON.parse(data.foundAt)

  try {
    const response = await postService.create(data)
    res.status(201).send(response)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/posts/:id', async (req, res) => {
  try {
    const response = await postService.findById(req.params.id)
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
