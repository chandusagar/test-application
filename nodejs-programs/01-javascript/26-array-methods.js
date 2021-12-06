const products = [
    { name: 'Biscuits', price: 20, quantity: 4, tax: 7 },
    { name: 'Chips', price: 30, quantity: 5, tax: 5 },
    { name: 'Cupcake', price: 30, quantity: 3, tax: 10 },
    { name: 'Chocolate', price: 45, quantity: 2, tax: 3 },
    { name: 'Mixture', price: 60, quantity: 1, tax: 15 }
];

// push(), pop(), splice(), reverse()

// if the function returns -ve number, then item 1 is placed before item2
// if the function returns +ve number, then item 2 is placed before item1
products.sort( ( item1, item2 ) => {
    return item1.price - item2.price;
});

console.log( products );

products.sort( ( item1, item2 ) => {
    return item1.tax - item2.tax;
});

console.log( products );