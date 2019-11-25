const Shelter = require('../../models/shelter')

const list = async () => {
  return await Shelter.find()
}

module.exports = list
