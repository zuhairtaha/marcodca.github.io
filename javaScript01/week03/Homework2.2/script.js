//make a loop that iterate on all the numbers up to 1000
for (var i = 0; i < 1000; i++ ) {
   
    //Make them display the different words depending if they are multiples of different numbers/combination of numbers.

    if ((i % 3 === 0) &&  (i % 5 === 0)) {
        console.log('FizzBuzz');
    } 
   
    else if (i % 3 === 0) {
        console.log('Fizz');
    }

    else if (i % 5 === 0) {
        console.log('Buzz');
    }

    //Otherwise, just print the number.

    else {
    console.log(i);
    }
}
