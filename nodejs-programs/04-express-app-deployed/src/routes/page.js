const express = require( 'express' );
const { getHome, getWorkshops, getPageNotFound } = require( '../controllers/page' );

const router = express.Router();

// handle request made to home router - i.e. /
router.get( '/', getHome );
router.get( '/workshops', getWorkshops );
router.get( '/page-not-found', getPageNotFound );

module.exports = router;