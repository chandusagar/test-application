// define the schema for the workshops collection
const mongoose = require( 'mongoose' );
const timeSchema = require( './Time' );

const workshopSchema = new mongoose.Schema({
    // We shall choose to store the topics in a separate collection (just so that we can see how to join 2 collections)...
    topicIds: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Topic'
    },
    // ...alternatively we could store the topics along with a Workshop document
    // topics: [ TopicSchema ],
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 512
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    startTime: timeSchema,
    endTime: timeSchema,
    location: {
        address: String,
        city: String,
        state: String
    },
    modes: {
        type: [ String ],
        default: []
    },
    imageUrl: String
}/*, { versionKey: false }*/); // use versionKey: false to prevent __v from being created

// create a Model (a class which shall help in querying the workshops collection) from the schema
// The Model is returned, but it is not necessary to get hold of it
/*const Workshop = */mongoose.model( 'Workshop', workshopSchema/*, 'workshops' */ )