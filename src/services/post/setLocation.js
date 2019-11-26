const Post = require('../../models/post')

const setLocation = async (id, location) => {
  try {
    const post = await Post.findById(id)
    await post.setLocation(location)    
    return post
  } catch (e) {
    throw e
  }
}

module.exports = setLocation
