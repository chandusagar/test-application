// use export along with definition...
// there can be one default export
export default class Person {
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

export function marry( person1, person2 ) {
    person1.spouse = person2;
    person2.spouse = person1;
};

// ...or, alternatively...
// export {
//     Person as default,
//     marry
// };