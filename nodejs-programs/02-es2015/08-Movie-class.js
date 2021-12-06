/**
 * Create a Movie class that represents details of a movie.
 * Suggested information to have in an object of the class - name, cast (an array of strings with cast member's names), yearOfRelease, boxOfficeCollection
 * addToCast( newMember ) that accepts a new cast member's name and adds to the cast array
 * addToCollection( amount ) that accepts box office collections for a week and adds it to the current boxOfficeCollection.
 * Create 2 objects of this class that represent any 2 movies. Call the methods addToCast() and addToCollection() and verify they work according to expectations.
 */
class Movie {
    constructor( name, yearOfRelease ) {
        this.name = name;
        this.yearOfRelease = yearOfRelease;
        this.cast = [];
        this.boxOfficeCollection = 0;
    }

    addToCast( member ) {
        this.cast.push( member );
    }

    addToCollection( amount ) {
        this.boxOfficeCollection += amount;
    }
}

const sholay = new Movie( 'Sholay', 1975 );
sholay.addToCast( 'Amitabh' );
sholay.addToCast( 'Dharmendra' );
sholay.addToCast( 'Hema' );
sholay.addToCollection( 100000000 );
sholay.addToCollection( 50000000 );

console.log( sholay );