const mongoose = require('mongoose');

const stubbleSchema = new mongoose.Schema({
    stubbleType: String,
    bidFlag: {
        type: Boolean,
        default: false
    },
    farmers : [{
        number : String,
        weight : String
    }]
})

const Stubble = mongoose.model('Stubble', stubbleSchema)

module.exports = Stubble