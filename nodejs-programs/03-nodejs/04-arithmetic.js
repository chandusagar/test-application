const sum = ( x, y ) => x + y;
const diff = ( x, y ) => sum( x, -y );
const mult = ( x, y ) => x * y;
const divide = ( x, y ) => x / y;

// whatever is the value of module.exports when the script completes execution, is the export of the module (i.e. file)
console.log( module.exports );

// we CAN use diff and divide in other modules (i.e. other files)
// we CANNOT use sum, mult in other modules
module.exports = {
    diff, // diff: diff
    divide
};