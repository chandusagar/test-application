const mongoose = require( 'mongoose' );

const timeSchema = mongoose.Schema({
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    _id: false
});

module.exports = timeSchema;