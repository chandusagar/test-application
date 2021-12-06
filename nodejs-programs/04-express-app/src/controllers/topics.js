// Reference (populate): https://mongoosejs.com/docs/populate.html
const mongoose = require( 'mongoose' );
const Topic = mongoose.model( 'Topic' );
const Workshop = mongoose.model( 'Workshop' );

const getTopics = async ( req, res, next ) => {
    try {
        let topics = await Topic.find().populate( 'workshopId', ['name', 'description', 'startDate', 'endDate' ] );

        const topicsUpdated = topics.map( topic => {
            const topicObj = topic.toObject();
            const workshop = topicObj.workshopId;
            delete topicObj.workshopId;

            return {
                ...topicObj,
                workshop: workshop
            };
        });

        res.json({
            receivedAt: res.locals.receivedAt,
            status: 'success',
            data: topicsUpdated
        });
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};

const postTopic = async ( req, res, next ) => {
    const workshop = await Workshop.findById( req.body.workshopId );

    if( !workshop ) {
        const error = new Error( 'Topic was not created. Workshop with given id does not exist.' );
        error.status = 400;
        return next( error );
    }

    try {
        const insertedTopic = await Topic.create( req.body );

        const updatedWorkshop = await Workshop.findByIdAndUpdate( workshop._id, { $addToSet: { topicIds: insertedTopic._id } } );

        res.status( 201 ).json({
            status: 'success',
            data: insertedTopic
        });
    } catch( error ) {
        if( error.name === 'ValidatorError' ) { // bad request
            error.status = 400;
            return next( error.message );
        } else { // internal server error
            error.status = 500;
            return next( error );
        }
    }
};

module.exports = {
    getTopics,
    postTopic
};