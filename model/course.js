const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    price: {
        type: Number,
        required: true
    },
    image: String
})

module.exports = model('course', courseSchema)