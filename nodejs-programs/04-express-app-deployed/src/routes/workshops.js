const express = require( 'express' );
const {
    getWorkshops,
    getWorkshop,
    postWorkshop,
    patchWorkshop,
    deleteWorkshop,
    getModes,
    postModes
} = require( '../controllers/workshops' );
const { authenticate, authorize } = require( '../middleware/auth' );

const router = express.Router();

router.get( '', getWorkshops );
router.get( '/:id', getWorkshop );
router.post( '/', authenticate, authorize( [ 'general', 'admin' ] ), postWorkshop );
router.patch( '/:id', authenticate, patchWorkshop );
router.delete( '/:id', authenticate, authorize( [ 'admin' ] ), deleteWorkshop )

// modes of a workshop
router.get( '/:id/modes', getModes );
router.post( '/:id/modes', authenticate, postModes );

module.exports = router;