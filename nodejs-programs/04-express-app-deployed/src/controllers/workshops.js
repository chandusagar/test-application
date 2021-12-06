const mongoose = require( 'mongoose' );
const { pageSize } = require( '../utils/config' );

const Workshop = mongoose.model( 'Workshop' );

// Sample query : http://localhost:3000/api/workshops?page=1&sortField=name&selectFields=name,description
const getWorkshops = async ( req, res, next ) => {
    let { page = 1, sortField, selectFields = '' } = req.query;

    page = parseInt( page );

    // send an error (alternatively we can assume page =1 (say) and proceed)
    if( isNaN( page ) ) {
        const error = new Error( 'page parameter must be a number' );
        error.status = 400;
        return next( error );
    }

    if( selectFields ) {
        selectFields = selectFields.split( ',' );
    }

    try {
        let workshops;

        if( sortField ) {
            // NOTE: you can do an additional query to find the count() of documents as well and include it in the response
            workshops = await Workshop.find( {}, selectFields ).skip( ( page - 1 ) * pageSize ).limit( pageSize ).sort( { [sortField]: 1 } );
        } else {
            workshops = await Workshop.find().skip( ( page - 1 ) * pageSize ).limit( pageSize );
        }

        res.json({
            receivedAt: res.locals.receivedAt,
            status: 'success',
            data: workshops
        });
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};

const getWorkshop = async ( req, res, next ) => {
    const { id } = req.params;

    try {
        // const workhop = Workshop.findOne( { id: id, otherField: otherFieldValue } )
        // When we pass a string as id, Mongoose will automatically cast it to ObjectId
        const workshop = await Workshop.findById( id ).populate( 'topicIds', [ 'name', 'description', 'sequenceId' ] );

        if( !workshop ) {
            const error = new Error( 'workshop with given id does not exist' );
            error.status = 404;
            return next( error );
        }

        res.json({
            status: 'success',
            data: workshop
        });
    } catch( error ) {
        if( error.kind === 'ObjectId' ) {
            const err = new Error( error.reason.message );
            err.status = 400;
            return next( err );
        } else {
            error.status = 500;
            return next( error );
        }
        
    }
};

const postWorkshop = async ( req, res, next ) => {
    // console.log( req.body );
    try {
        const insertedWorkshop = await Workshop.create( req.body );
        res.status( 201 ).json({
            status: 'success',
            data: insertedWorkshop
        });
    } catch( error ) {
        if( error.name === 'ValidatorError' ) { // bad request
            error.status = 400;
            return next( error );
        } else { // internal server error
            error.status = 500;
            return next( error );
        }
    }
};

// MongoDB equivalent query : db.workshops.updateOne( { _id: ObjectId( "6196285e4821a8ded1ef5204" ) }, { $set: { "startTime.hours": 8 } } )
const patchWorkshop = async ( req, res, next ) => {
    const { id } = req.params;
    const body = { ...req.body }; // shallow copy of the body (objects / arrays will still refer to original body's objects/ arrays)

    if( !body ) {
        const error = new Error( 'No data has been sent in the body' );
        error.status = 400;
        return next( error );
    }

    // { startTime: { hours: 7 } } -> { "startTime.hours": 7 }
    if( body.startTime ) {
        // copy the body.startTime object
        body.startTime = { ...body.startTime };

        if( body.startTime.hours ) {
            body["startTime.hours"] = body.startTime.hours;
        }
        
        if( body.startTime.minutes ) {
            body["startTime.minutes"] = body.startTime.minutes;
        }

        delete body.startTime;
    }
    
    if( body.endTime ) {
        // copy the body.startTime object
        body.endime = { ...body.endTime };

        if( body.endTime.hours ) {
            body["endTime.hours"] = body.endTime.hours;
        }
        
        if( body.endTime.minutes ) {
            body["endTime.minutes"] = body.endTime.minutes;
        }

        delete body.endTime;
    }

    try {
        // { returnOriginal: false } -> this makes sure the new values are returned and NOT the old ones
        // { runValidators: true } -> this makes sure the validations run on updates
        // You can set this property here or globally (for all update queries) using mongoose.set (refer data/init.js)
        const updatedWorkshop = await Workshop.findByIdAndUpdate( id, body/*, { returnOriginal: false } */);
        res.json({
            status: 'success',
            data: updatedWorkshop
        });
    } catch( error ) {
        // @todo ObjectId check needs to be made

        if( error.name === 'ValidatorError' ) { // bad request
            error.status = 400;
            return next( error );
        } else {
            error.status = 500;
            return next( error );
        }
    }
};

const deleteWorkshop = async ( req, res, next ) => {
    const { id } = req.params;

    try {
        await Workshop.findByIdAndRemove( id );
        // res.status( 204 ); // use this if you do not want to send anything back in response body
        res.status( 200 ).json({
            status: 'success',
            data: null
        });
    } catch( error ) {
        // @todo ObjectId check needs to be made

        error.status = 500;
        return next( error );
    }
};

const getModes = async ( req, res, next ) => {
    const { id } = req.params;

    try {
        const workshopModes = await Workshop.findById( id, { modes: true } );
        res.json({
            receivedAt: res.locals.receivedAt,
            status: 'success',
            data: workshopModes
        });
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};


// Target to create an object like { $addToSet: { "modes": { $each: [ "abc", "pqr" ] } } } in order to add items to modes
const postModes = async ( req, res, next ) => {
    const { id } = req.params;

    if( !req.body || !(req.body instanceof Array) ) {
        const error = new Error( 'No modes have been sent in the body, or body is not an array' );
        error.status = 400;
        return next( error );
    }

    const body = [ ...req.body ];

    const updateClause = {
        $addToSet: {
            modes: {
                $each: body
            }
        }
    };

    try {
        const workshopModes = await Workshop.findByIdAndUpdate( id, updateClause );
        res.json({
            receivedAt: res.locals.receivedAt,
            status: 'success',
            data: workshopModes.modes
        });
    } catch( error ) {
        error.status = 500;
        return next( error );
    }
};

module.exports = {
    getWorkshops,
    getWorkshop,
    postWorkshop,
    patchWorkshop,
    deleteWorkshop,
    getModes,
    postModes
};