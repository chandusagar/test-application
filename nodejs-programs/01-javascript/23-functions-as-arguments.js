// const f = ( person ) => console.log( person );
const f = ( fn ) => fn();

const g = () => console.log( 'i am g' );

// f({
//     name: 'John',
//     age: 32
// });

f( g ); // fn = g, fn() -> g()