//1.Strings!

//1.1

let myString = "hello,this,is,a,difficult,to,read,sentence";

console.log(1.1 , myString);

//1.2

console.log(1.2 , myString.length);

//1.3

let myNewString = myString;

for (i=0; i<7; i++ ) {
     myNewString = myNewString.replace(',',' ');
}

//1.4

console.log(1.4, myNewString);

//2.Arrays!

let favoriteAnimals = ['blowfish', 'capricorn', 'giraffe'];

//2.1

favoriteAnimals.push('turtle');

//2.2

console.log(2.2 , favoriteAnimals);

//2.3

favoriteAnimals.splice(1,0, 'Meerkat');

//2.4

console.log(2.4 , 'The length of the array should be of 4');

//2.5

console.log(2.5 , favoriteAnimals);


console.log(2.6 , ` The lenght of the array is of ${favoriteAnimals.length}`);

//2.7

favoriteAnimals.splice(3,1);

//2.8

console.log(2.8 , favoriteAnimals);

//2.9, 2.10

console.log(2.10 , 'The item you are looking for is at index: ' + favoriteAnimals.indexOf('Meerkat'));

//More JavaScript

//1

function summ(a,b,c) {
    return a + b + c ;
}

console.log(1, summ(3,2,1));

//2

function colorCar(color) {
    return 'The car is color: ' + color + '.';
}

console.log(2, colorCar('red'));

//3

let player1 = {
    number: 'King',
    suit: 'Spades',
    freq: 0
}

function printObj(obj) {
    return console.log(3, obj);
}
printObj(player1);

//4

vehicleType = (color, code) => {
    if (code === 1) {
        code = 'Car';
    }
    else if (code === 2)  {
        code = 'Motorbike';
    }
    else {
        code = 'Not assigned';
    }
    console.log(4, `A ${color} ${code} . `);
}

vehicleType('red',1);

//5

3 === 3 ? console.log(5, 'Is three') : console.log(5, 'Is not three');

//6

vehicle = (color, code, age=0) => {
    if (code === 1) {
        code = 'Car';
    }
    else if (code === 2)  {
        code = 'Motorbike';
    }
    else {
        code = 'Not assigned';
    }

    if (age === 0) {
        age = 'new';
    }

    else {
        age = 'used';
    }
    console.log(5, `A ${color} ${age} ${code} . `);
}

vehicle('red', 1, 1);

//7

let listVehicles = ['Car', 'Motorbike', 'Truck','Spaceship'];

//8

console.log(8, listVehicles[2]);

//9

newVehicle = (color, code, age=0) => {
    if (code === 1) {
        code = listVehicles[0];
    }
    else if (code === 2)  {
        code = listVehicles[1];
    }

    else if (code === 3)  {
        code = listVehicles[2];
    }

    else if (code === 4)  {
        code = listVehicles[3];
    }

    else {
        code = 'Not assigned';
    }

    if (age === 0) {
        age = 'new';
    }

    else {
        age = 'used';
    }
    console.log(9, `A ${color} ${age} ${code} . `);
}

newVehicle('red', 3, 0);

//10 & 11

let len = listVehicles.length;

let lastItem = listVehicles.pop()

let stringlistVehicles = listVehicles.join (' , a ') ;

console.log("Amazing Joe's Garage, we can service a " + stringlistVehicles + ' and a ' + lastItem + ' .');

//12

 let emptyObj = {

 };

//13

 let teachers = {
    names: ['Abed', 'Svetlana','Marjahan']
 };

 //14

 teachers.languages =  ['HTML & CSS', 'JavaScript'];

 console.log(teachers);

//15

 let x = [1,2,3];
 let y = [1,2,3];
 let z = y;

 if (x == y) {
     console.log('x==y match');
 }
 else {
    console.log('x==y do not match');
 }

 if (x === y) {
    console.log('x===y match');
}
else {
   console.log('x===y do not match');
}


if (z == y) {
    console.log('z==y match');
}
else {
   console.log('z==y do not match');
}

if (z === y) {
    console.log('z===y match');
}

else {
    console.log('x===y do not match');
 }
 

if (z == x) {
    console.log('z==x match');
}
else {
   console.log('z==x do not match');
}

//16

let o1 = { foo: 'bar' };
let o2 = { foo: 'bar' };
let o3 = o2;

console.log(o3==o2);

o2.add = 'Empty string';

o1.vadd = 'Stuff';

console.log(o2);

console.log(o3);

console.log(o1);

//17
//In the second case, typeof returns a string, because it is considerind the "number" value of the previus typeof, which is, of course, a string.

let bar = 42;
console.log(typeof bar);
console.log(typeof typeof bar);




