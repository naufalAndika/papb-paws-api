const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
// const upload = require('../middleware/upload')
const postService = require('../services/post/index')

const multer = require('multer')

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})


router.post('/posts', auth, upload.single('photo'), async (req, res) => {
  const data = {
    ...req.body,
    photo: req.file.buffer
  }

  try {
    const response = await postService.create(data)
    res.status(201).send(response)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
