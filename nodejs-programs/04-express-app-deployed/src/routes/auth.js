const express = require( 'express' );
const { login, register } = require( '../controllers/auth' );

const router = new express.Router();

router.post( '/register', register );
router.post( '/login', login );

module.exports = router;