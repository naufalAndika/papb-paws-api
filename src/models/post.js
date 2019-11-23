const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  photo: {
    type: Buffer
  },
  desc: {
    type: String
  },
  sex: {
    type: Number
  },
  foundAt: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
