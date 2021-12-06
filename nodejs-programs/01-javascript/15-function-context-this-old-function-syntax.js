// this refers to the "function's context"
function foo() {
    console.log( 'foo this = ', this );
    console.log( 'foo this.name = ', this.name );
}

foo(); // this -> global object

console.clear();

// another way to call foo function
foo.call({
    name: 'John'
});



