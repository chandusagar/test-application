// "Functions are first-class citizens"
// You can do with a function whatever you can do with an object

const foo = () => {
    const john = {
        name: 'John',
        age: 32
    };

    return john;
}

console.log( foo() );

// every time we call bar a new inner function is created
const bar = () => {
    function speak( message ) {
        console.log( message );
    }

    return speak;
};

const talk = bar(); // talk is a function // const talk = speak;
talk( 'I am happy' );

// we can call the returned function immediately as well like this
bar()( 'I am sad' );