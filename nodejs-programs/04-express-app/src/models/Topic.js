// Reference (ref/populate): https://mongoosejs.com/docs/populate.html
const mongoose = require( 'mongoose' );

// Because there is a 1:N relationship (Workshop:Topics) we can store ObjectId of workshop in topic
const topicSchema = new mongoose.Schema({
    // this is a foreign key that references the workshops collection
    workshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    },
    sequenceId: Number,
    name: {
        type: String,
        unique: true,
        required: true
    },
    speaker: String,
    duration: {
        type: Number,
        required: true,
        min: 0
    },
    level: {
        type: String,
        enum: [ "Basic", "Intermediate", "Advanced" ]
    },
    description: String,
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    }
});

mongoose.model( 'Topic', topicSchema );