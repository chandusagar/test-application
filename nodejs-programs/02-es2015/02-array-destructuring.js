// arrays and object are structured data types
const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

// const first = weekdays[0], second = weekdays[1], fifth = weekdays[4];
const [ first, second, , , fifth = 'Holiday', sixth = 'Holiday 1' ] = weekdays;
console.log( first, second, fifth, sixth );