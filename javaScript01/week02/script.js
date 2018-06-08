//Create an array with the names of all the class members.


let hYF06 = ['Zeeshan', 'Anas', 'Sajid', 'Anuradha', 'Gary', 'Marco', 'Ehsan','Haretha','Krishna', 'Mohammad Azizul Huq','Mohammad Mosiur Rahman','Samara', 'Vignesh', 'Zoey Zou', 'Mohammad Subhiyeh'];

//Log the array.

console.log(hYF06);


//Create a function that returns a random number from 0 to the length of the array.

let randNum = () => {

//Declare and set a variable for the total length of the class member's array.    

    let limitArray = hYF06.length;

//Use Math.random to get the number.    

    return  Math.floor(Math.random() * limitArray);
    
};

//Create two variables, one for each pair of classmates. The variables uses the created randNum function to get a random member of the array.

let person1 = hYF06[randNum()];

let person2 = hYF06[randNum()];

//Create a conditional to check that the randomly genereted members are not the same!

if ( person1 !== person2) {

//If they are not the same, log the names, and print them in the HTML document.
    
    console.log(person1 , person2);

    document.write(`The randomly generated pair of classmates is: ${person1} and ${person2} .`)

}
else {

//Otherwise, repeate the assigment, until the values don't match.
    
    while (person1 == person2) {
      person1 = hYF06[randNum()];

      person2 = hYF06[randNum()];
    }
    console.log(person1 , person2 +'(more than one attempt was needed!)');

    document.write(`The randomly generated pair of classmates is: ${person1} and ${person2} .`)
    

}





