const EventEmitter = require( 'events' );

const timer = ( periodInSeconds ) => {
    const ee = new EventEmitter();

    let count = 0;

    setInterval(() => {
        count++;
        
        if( count > 20 ) {
            // 'error' event is treated specially
            // if no one handles error event, the script throws an error
            ee.emit( 'error', new Error( 'maximum time periods reached' ) );
        }
        
        // we need to inform that 1 time period has passed
        // second argument is data that needs to be passed to event handlers
        ee.emit( 'period_elapsed', count );

        if( count % 10 === 0 ) {
            ee.emit( '10_periods_elapsed' );
        }

        
    }, periodInSeconds * 1000 );

    return ee;
};

module.exports = timer;