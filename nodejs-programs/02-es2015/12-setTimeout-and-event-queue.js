// the job of setTimeout is ONLY to make the request to the runtime (Node js) to execute the given function after the given amount of time
// setTimeout is a non-blocking function
setTimeout(
    () => {
        console.log( 'i am function passed to setTimeout' );
    },
    3000 // time is given in milliseconds
);

// no delay in executing this line (called right after setTimeout is called)
console.log( 'after call to setTimeout' );

// Node JS meanwhile has started a timer which will expire in 3 seconds. Once the time expires, Node JS will queue up the function in an "Event queue". It will check the queue only when it is free (function call stack is empty) and nothing else to execute.

// waste some time of the CPU (hope to waste more than 3 seconds)
for( let i = 0; i < 1e10; i++ ) {
    ;
}