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
      type: Number
    },
    long: {
      type: Number
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
  },
  adopted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

postSchema.methods.adopt = async function () {
  const post = this
  post.adopted = true
  await post.save()
}

const Post = mongoose.model('Post', postSchema)

module.exports = Post
