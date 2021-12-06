const timer = require( './19-timer' );

const ee = timer( 0.5 );

// register the function to be called when the event 'period_elapsed' is emitted
ee.on( 'period_elapsed', ( count ) => {
    console.log( count, new Date() );
});

ee.on( '10_periods_elapsed', () => {
    console.log( '*****' );
});

ee.on( 'error', error => {
    console.log( error.message );
});