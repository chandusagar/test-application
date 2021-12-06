// this refers to the "function's context"
// arrow function's context is different, and it cannot be changed
const foo = () => {
    console.log( 'foo this = ', this );
    console.log( 'foo this.name = ', this.name );
}

foo(); // this -> global object

// another way to call foo function
foo.call({
    name: 'John'
});