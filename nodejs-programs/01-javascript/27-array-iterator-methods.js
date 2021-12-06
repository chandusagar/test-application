const products = [
    { name: 'Biscuits', price: 20, quantity: 4, tax: 7 },
    { name: 'Chips', price: 30, quantity: 5, tax: 5 },
    { name: 'Cupcake', price: 30, quantity: 3, tax: 10 },
    { name: 'Chocolate', price: 45, quantity: 2, tax: 3 },
    { name: 'Mixture', price: 60, quantity: 1, tax: 15 }
];

// do something on each item
// forEach() - subtitute for a for loop
products.forEach(( item, idx ) => {
    console.log( idx );
    item.total = ( item.price + item.tax ) * item.quantity;
});

console.log( products );

// find the first item that satisfies some criteria (find the first item which is priced >= Rs. 40)
// find() - the function returns true / false
const itemAbove40 = products.find( item => item.price >= 40 );
console.log( itemAbove40 );

// find all items that satisfy some criteria (find all items which are priced >= Rs. 40)
// filter() - similar to find, but returns an array of items
const allItemsAbove40 = products.filter( item => item.price >= 40 );
console.log( allItemsAbove40 );

// we want array of names of items
// map()
// [ 'Biscuits', 'Chips', ... ]

// using forEach -> not a specialist at this requirement
// const productNames = [];
// products.forEach(( item ) => {
//     productNames.push( item.name );
// });

// console.log( productNames );

// usng map -> a specialist for this requirement
const productNames = products.map( item => item.name );
console.log( productNames );

// recipe for combining these iterators to do more complex tasks
// combining map and filter
const namesOfAllItemsAbove40 = products.filter( item => item.price >= 40 ).map( item => item.name );
console.log( namesOfAllItemsAbove40 );

// reduce() - self-exploration

// EXERCISE:
/**
 * 25. Given the following array, solve the questions that follow using appropriate array iterator
methods (forEach, find, filter, map)
```
var phones = [
 { name : 'Samsung Galaxy S10+ Plus', price: 620, type: 'refurbished', manufacturer: 'Samsung' },
 { name : 'Apple iPhone 7 Plus', price: 450, type: 'refurbished', manufacturer: 'Apple' },
 { name : 'One Plus 6', price: 430, type: 'new', manufacturer: 'OnePlus' },
 { name : 'Apple iPhone Xs', price: 910, type: 'new', manufacturer: 'Apple' },
 { name : 'One Plus 7', price: 430, type: 'refurbished', manufacturer: 'OnePlus' },
 { name : 'Apple iPhone 8 Plus', price: 610, type: 'new', manufacturer: 'Apple' },
];
```
* Create a new array with the name of each phone. Thus the new array that should be generated
would be [ 'Samsung Galaxy S10+ Plus', 'Apple iPhone 7 Plus', ... ] - map()
* Create a new array with objects representing new phones - .filter( item => item.type === 'new' ).map( item => itme.name )
* Find all the phones whose price is less than $440 and print them - .filter( i => item.price < 440 ).map( i => i.name )
*/