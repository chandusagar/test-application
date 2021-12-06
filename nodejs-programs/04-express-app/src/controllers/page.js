const workshops = require( '../data/workshops.json' );

const getHome = ( req, res ) => {
    /**
     * res.write() and res.end() will also work
     * res.send() adds 'Content-Type': 'text/html'
     * Similarly there is sendFile(), json(), render()
     * process.cwd() will be folder where node runs (project folder)
     */
    // res.sendFile( path.join( process.cwd(), 'src/views/index.html' ) );
    res.render( 'index', {
        pageTitle: 'Workshops App'
    });
};

const getWorkshops = ( req, res ) => {
    res.render( 'workshops', {
        pageTitle: 'List of Workshops',
        workshops
    });
};

const getPageNotFound = ( req, res ) => {
    res.render( 'error', {
        pageTitle: 'Page not found'
    });
};

module.exports = {
    getHome,
    getWorkshops,
    getPageNotFound
};