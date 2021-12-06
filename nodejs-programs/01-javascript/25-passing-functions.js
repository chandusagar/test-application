// EXERCSE: Create the function max (assume fn always returns >= 0)
const max = ( products, fn ) => {
    let maxIdx = -1, max = 0;

    for( let i = 0; i < products.length; i++ ) {
        const currentVal = fn( products[i] );
        if( currentVal > max ) {
            max = currentVal;
            maxIdx = i;
        }
    }

    return products[maxIdx];
};

const products = [
    { name: 'Chips', price: 30, quantity: 5, tax: 5 },
    { name: 'Chocolate', price: 45, quantity: 2, tax: 3 },
    { name: 'Biscuits', price: 20, quantity: 4, tax: 7 }
];

const getPrice = item => item.price;
const getTotal = item => ( item.price + item.tax ) * item.quantity;

// Given a function as the second argument, max() returns the item which gives the maximum value
// { name: 'Chocolate', price: 45, quantity: 2, tax: 3 }
console.log( max( products, getPrice ) ); 
// { name: 'Chips', price: 30, quantity: 5, tax: 5 } since total is 375
console.log( max( products, getTotal ) );

// please ignore this - it may not be useful...
// const key = 'price'
// // products[0].price;
// console.log( products[0][key] );