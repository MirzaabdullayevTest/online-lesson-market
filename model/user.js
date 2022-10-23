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
        count: Number
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    admin: Boolean
})  


module.exports = model('user', userSchema)