class Person {
    constructor( name, age ) {
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

class Employee extends Person {
    constructor( name, age, dept, role ) {
        super( name, age );

        this.dept = dept;
        this.role = role;
    }

    promote() {
        this.role = `Senior ${this.role}`;
    }

    celebrateBirthday() {
        super.celebrateBirthday(); // calls the Person class celebrateBirthday()
        this.credits = 1000;
    }
}

const john = new Employee( 'John', 32, 'IT', 'Web Developer' );
john.celebrateBirthday();
john.addEmail( 'john@example.com' );
john.addEmail( 'john@ness.com' );
john.promote();
console.log( john );

const jane = new Employee( 'Jane', 28, 'Finance', 'Auditor' );
jane.celebrateBirthday();
jane.promote();
console.log( jane );