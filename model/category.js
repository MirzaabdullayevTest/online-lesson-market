const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String
})

module.exports = model('category', categorySchema)