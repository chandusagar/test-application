const workshops = require( '../data/workshops.json' );
const mongoose = require( 'mongoose' );

const Workshop = mongoose.model( 'Workshop' );

const getWorkshops = ( req, res ) => {
    res.json({
        receivedAt: res.locals.receivedAt,
        status: 'success',
        data: workshops
    });
};

const getWorkshop = ( req, res, next ) => {
    const { id } = req.params;
    const idNum = parseInt( id );

    if( isNaN( idNum ) ) {
        const error = new Error( 'workshop id must be a number' );
        error.status = 400;
        return next( error );
    }

    const workshop = workshops.find( w => w.id == idNum );

    if( !workshop ) {
        const error = new Error( 'workshop with given id does not exist' );
        error.status = 404;
        return next( error );
    }

    res.json({
        status: 'success',
        data: workshop
    });
};

module.exports = {
    getWorkshops,
    getWorkshop
};