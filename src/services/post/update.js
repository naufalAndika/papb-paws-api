const Post = require('../../models/post')

const update = async (id, data) => {
  try {
    const post = await Post.findById(id)
    const updates = Object.keys(data)
    
    updates.forEach((update) => post[update] = data[update])
    await post.save()
    return post
  } catch (e) {
    throw e
  }
}

module.exports = update
