const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const authorization = req.get( 'Authorization' );

    if( !authorization ) {
        const error = new Error( 'Token is not sent' );
        error.status = 401;
        return next( error );
    }

    const token = authorization.split( ' ' )[1];

    jwt.verify( token, process.env.JWT_SECRET, ( err, claims ) => {
        if( err ) {
            err.status = 403;
            return next( err );
        }

        res.locals.claims = claims;
        next();
    });
};

const authorize = ( roles ) => {
    return ( req, res, next ) => {
        const role = res.locals.claims.role;

        if( roles.includes( role ) ) {
            next();
        } else {
            const error = new Error( 'You do not have sufficient privileges' );
            error.status = 403;
            return next( error );
        }
    };
};

module.exports = {
    authenticate,
    authorize
};