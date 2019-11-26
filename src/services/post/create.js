const Post = require('../../models/post')

const create = async (data) => {
  const post = new Post(data)
  try {
    await post.save()
    return post
  } catch (e) {
    throw e
  }
}

module.exports = create
