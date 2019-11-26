const Post = require('../../models/post')

const adopt = async (id) => {
  try {
    const post = await Post.findById(id)
    await post.adopt()
    return post
  } catch (e) {
    throw e
  }
}

module.exports = adopt
