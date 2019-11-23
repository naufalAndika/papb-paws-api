const mongoose = require('mongoose')

const shelterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  location: {
    lat: {
      type: String
    },
    long: {
      type: String
    }
  }
}, {
  timestamps: true
})

const Shelter = mongoose.model('Shelter', shelterSchema)

module.exports = Shelter
