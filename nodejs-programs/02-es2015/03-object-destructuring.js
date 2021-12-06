const john = {
  "full name": "John",
  age: 32,
  spouse: "Jane",
  emails: ["john@gmail.com", "john@ness.com"],
  address: {
    city: "Bangalore",
    region: "Koramangala",
  },
};

// const fullName = john['full name'], age = john.age, spouse = john.spouse, primaryEmail = john.emails[0], secondaryEmail = john.emails[1], city = john.address.city, region = john.address.region;

const {
    age,
    "full name": fullName,
    spouse: wife,
    emails: [
        primaryEmail,
        secondaryEmail
    ],
    address: {
        city,
        region,
        pinCode = "Unavailable"
    },
} = john;

console.log(
  age,
  fullName,
  wife,
  primaryEmail,
  secondaryEmail,
  city,
  region,
  pinCode
);

/**
 * EXERCISE
 * 1. Use array and object destructuring feature to create variable that hold values as shown below.
**/
const iPhone11 = {
 name: 'iPhone 11',
 manufacturer: 'Apple',
 price: 699,
 specs: {
    color: 'White',
    memory: {
        value: 128,
        unit: 'MB'
    },
    cameras: {
        front: '12 MP Wide',
        rear: '12 MP Ultra Wide'
    },
    availableColors: [ 'Black', 'Green', 'Yellow', 'Purple', 'Red', 'White' ]
 },
 calculateDiscoutedPrice: function( percentage ) {
    return this.price * ( 100 - percentage ) / 100;
 }
}

// create the variables using destructuring - the variables should have values as shown below.
// destructure here...
const {
    name,
    manufacturer : brand,
    specs: {
        memory: {
            value: ram
        },
        cameras: {
            rear: rearCamera
        },
        availableColors: [ , secondColor ]
    },
} = iPhone11;

// below line logs - iPhone 11 Apple 128 12 MP Ultra Wide Green
console.log( name, brand, ram, rearCamera, secondColor );