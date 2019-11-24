const User = require('../../models/user')

const login = async (username, password) => {
  try {
    const user = await findByCredentials(username, password)
    const token = await generateToken(user)

    return {
      user,
      token
    }
  } catch (e) {
    throw e
  }
}

const findByCredentials = async (username, password) => {
  try {
    const user = await User.findByUsername(username)    
    await user.matchPassword(password)    

    return user
  } catch (e) {    
    throw e
  }
}

const generateToken = async (user) => {
  const token = await user.generateToken()
  await user.addToken(token)

  return token
}

module.exports = login
