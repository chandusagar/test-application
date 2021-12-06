const logger = ( req, res, next ) => {
    console.log( 'req.method = ', req.method );
    console.log( 'req.url = ', req.url );

    // you can add any data to res.locals (some people add to req as well). This can be helpful for other middleware functions that follow
    res.locals.receivedAt = new Date();

    // passes control to the next middleware function
    next();

    const date = new Date();
    console.log( 'Time taken for processing the request = ', date.getTime() - res.locals.receivedAt.getTime() );
};

module.exports = {
    logger
};