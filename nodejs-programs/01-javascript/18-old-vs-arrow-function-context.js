function outer() {
    console.log( 'outer this = ', this );

    const innerOld = function() {
        console.log( 'innerOld this = ', this );
    };

    innerOld();
    
    // arrow function context comes from the enclosing function's (scope's) context
    const innerNew = () => {
        console.log( 'innerNew this = ', this );
    };

    innerNew();
}

// outer(); // this -> global

outer.call({ // this -> { name: 'John' }
    name: 'John'
});