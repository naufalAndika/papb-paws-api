const Shelter = require('../../models/shelter')

const findByid = async (_id) => {
  const shelter = await Shelter.findById(_id)
  return shelter
}

module.exports = findByid
