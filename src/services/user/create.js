const User = require('../../models/user')

const create = async (data) => {
  const user = new User(data)
  try {
    await user.save()
    return user
  } catch (e) {
    throw new Error('Create service error!')
  }
}

module.exports = create
