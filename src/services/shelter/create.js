const Shelter = require('../../models/shelter')

const create = async (data) => {
  const shelter = new Shelter(data)
  try {
    await shelter.save()
    return shelter
  } catch (e) {
    throw e
  }
}

module.exports = create
