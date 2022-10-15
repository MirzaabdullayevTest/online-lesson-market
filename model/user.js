const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    card: {
        items: [
            {
                courseId: Types.ObjectId
            }
        ],
        price: Number
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = model('user', userSchema)