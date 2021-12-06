const john = {
  "full name": "John",
  age: 32,
  spouse: "Jane",
  emails: ["john@gmail.com", "john@ness.com"],
  address: {
    city: "Bangalore",
    region: "Koramangala",
  },
  // arrow function MUST NOT be used for object methods (the "this" will NOT be the calling object if used)
  addEmail: function(newEmail) {
    // console.log( 'addEmail this = ', this ); // this -> calling object
    this.emails.push(newEmail);
  },
  // simplified method syntax (ES2015)
  celebrateBirthday() {
    this.age++;
  },
};

john.addEmail("john@outlook.com");
john.celebrateBirthday();

console.log(john);

/**
 * EXERCISE:
 * 20. Create a movie object that represents details of your favorite movie.
 * Suggested information to have in the object
 * name, cast (an array of strings with cast member's names), yearOfRelease, boxOfficeCollection
 * addToCast( newMember ) that accepts a new cast member's name and adds to the cast array
 * addToCollection( amount ) that accepts box office collections for a week and adds it to the current boxOfficeCollection.
 * Expected time: 10 minutes
 */

const movie = {
  name: "Sholay",
  cast: ["Dharmender", "Amitab"],
  yearOfRelease: 1975,
  boxOffoceCollection: 2000000,
  addTocast: function (newMember) {
    this.cast.push(newMember);
  },
  addToCollection: function (amount) {
    this.boxOffoceCollection += amount;
  },
};

movie.addTocast("Hema");
movie.addToCollection(50000);

console.log(movie);
