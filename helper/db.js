const mongoose = require('mongoose')

module.exports = async function (uri) {
    try {
        await mongoose.connect(uri, (err) => {
            if (err) {
                console.error(err);
            }

            console.log('Mongodb connected');
        })
    } catch (error) {
        console.error(err);
    }
}