const Post = require('../../models/post')

const findById = async (id) => {
  try {
    const post = await Post.findById(id)
    return post
  } catch (e) {
    throw e
  }
}

module.exports = findById
