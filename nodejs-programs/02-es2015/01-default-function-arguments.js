const greet = ( message = 'Hello', name = 'World' ) => console.log( `${message} ${name}!` );

greet( 'Hello', 'John' );
greet( 'Hello' ); // name will be assigned the default ('World')
greet( undefined, 'Jane' );