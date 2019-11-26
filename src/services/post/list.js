const Post = require('../../models/post')

const list = async () => {
  const response = await Post.find()
  return response
}

module.exports = list
