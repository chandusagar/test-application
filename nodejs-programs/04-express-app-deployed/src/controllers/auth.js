const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken' );
const User = mongoose.model( 'User' );

const register = async ( req, res, next ) => {
    const credentials = req.body;
    
    try {
        const user = await User.create( credentials )
        res.json({
            status: 'success',
            message: 'You have been registered successfully'
        });
    } catch( error ) {
        // @todo better checks for error
        error.status = 500;
        return next( error );
    }
};

const login = async ( req, res, next ) => {
    // this has { email: string, password: string }
    const u = req.body;

    if( !u ) {
        const error = new Error( 'Login details not sent in request body' );
        error.status = 400;
        next( error );
        return;
    }
    
    if( !u.email || !u.password ) {
        const error = new Error( 'Login details not sent in request body' );
        error.status = 400;
        next( error );
        return;
    }

    const user = await User.findOne( { email: u.email } );
    
    if( !user ) {
        const error = new Error( 'No matching credentials' );
        error.status = 401;
        return next( error );
    }

    user.checkPassword( u.password, ( error, isMatch ) => {
        if( error ) {
            error.status = 500;
            return next( error );
        }

        if( !isMatch ) {
            const error = new Error( 'No matching credentials' );
            error.status = 401;
            return next( error );
        }

        const claims = {
            role: user.role,
            email: user.email
        };

        jwt.sign( claims, process.env.JWT_SECRET, ( err, token ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.json({
                status: 'success',
                message: 'You have logged in successfully',
                email: user.email,
                token
            });
        })
    });
};

module.exports = {
    register,
    login
};