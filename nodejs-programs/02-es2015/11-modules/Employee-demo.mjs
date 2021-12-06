import { Employee } from './Employee.mjs';

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