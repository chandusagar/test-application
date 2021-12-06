/**
 * EXERCISE
 * 03-Nodejs - Lab Guide
 * 6. Create a module to calculate areas of various shapes.
 - Square (public function) - makes use of Rectangle function to calculate area
 - Rectangle (private function)
 - Circle (public function)
 - PI (private variable)
 Make use of this module in another module (i.e. file)
 */
const rectangle = ( l, b ) => l * b;
const square = s => rectangle( s, s );
const PI = Math.PI;
const circle = r => PI * r * r;

module.exports = {
    square,
    circle
};