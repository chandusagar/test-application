// default exported member is put outside the braces - any name can be used
import Human, { marry as wed } from './Person.mjs';

class Employee extends Human {
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

export {
    Employee
};