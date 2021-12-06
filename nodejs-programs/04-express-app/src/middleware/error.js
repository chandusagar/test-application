const pageNotFound = ( req, res, next ) => {
    // show the page not found page directly...
    // res.status( 404 ).render( 'error', {
    //     pageTitle: 'Page not found'
    // });

    // or alternatively, choose to redirect the browser to the page not found page
    res.redirect( '/page-not-found' );
};

const apiNotSupported = ( req, res, next ) => {
    const error = new Error( `${req.url} is not suported` );
    error.status = 404;
    return next( error );
};

// if you create a middleware with 4 arguments it is considered asn error handling middleware
const apiErrorHandler = ( error, req, res, next ) => {
    res.status( error.status ).json({
        status: 'error',
        message: error.message
    });
};

module.exports = {
    pageNotFound,
    apiNotSupported,
    apiErrorHandler
};