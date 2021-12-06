const sumArray = ( arr ) => {
    let sum = 0;

    for( let i = 0; i < arr.length; i++ ) {
        sum += arr[i];
    }

    return sum;
};

console.log( sumArray( [ 1, 2, 3, 4 ] ) );

const sumSquaresArray = ( arr ) => {
    let sum = 0;

    for( let i = 0; i < arr.length; i++ ) {
        sum += arr[i] * arr[i];
    }

    return sum;
};

console.log( sumSquaresArray( [ 1, 2, 3, 4 ] ) );

const sumCubesArray = ( arr ) => {
    let sum = 0;

    for( let i = 0; i < arr.length; i++ ) {
        sum += arr[i] * arr[i] * arr[i];
    }

    return sum;
};

console.log( sumCubesArray( [ 1, 2, 3, 4 ] ) );

const sumAll = ( arr, fn ) => {
    let sum = 0;

    for( let i = 0; i < arr.length; i++ ) {
        sum += fn( arr[i] );
    }

    return sum;
};

const asIs = x => x;
const square = x => x * x;
const cube = x => x * x * x;

console.log( sumAll( [ 1, 2, 3, 4 ], asIs ) );
console.log( sumAll( [ 1, 2, 3, 4 ], square ) );
console.log( sumAll( [ 1, 2, 3, 4 ], cube ) );
console.log( sumAll( [ 1, 2, 3, 4 ], Math.log ) );
console.log( sumAll( [ 1, 2, 3, 4 ], x => x ** 4 ) );