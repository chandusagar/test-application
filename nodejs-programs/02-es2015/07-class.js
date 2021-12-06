class Person {
    // no upfront declaration of data members
    
    constructor( name, age ) {
        // console.log( this ); // {}
        this.name = name; // { name: ... }
        this.age = age; // { name: ..., age: ... }
        this.emails = [];
    }

    celebrateBirthday() {
        this.age++;
    }

    addEmail( email ) {
        this.emails.push( email );
    }
}

const john = new Person( 'John', 32 );
john.celebrateBirthday();
john.addEmail( 'john@example.com' );
john.addEmail( 'john@ness.com' );
console.log( john );

const jane = new Person( 'Jane', 28 );
jane.celebrateBirthday();
console.log( jane );