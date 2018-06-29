//First we have the function to generate cars, which was already provided.
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCars(numberOfCars) {
    const cars = [];

    const carMakes = ['Honda', 'BMW','Fiat','Skoda','Volvo'];
    const carColors = ['lightgrey', 'lightcyan','lightyellow','lightgreen','lightcoral','lightpink'];
    
    for (let i = 0; i < numberOfCars; i++) {
        const car = {};
        const randomMakeIndex = randomIntFromInterval(0, carMakes.length - 1);
        const randomColorIndex = randomIntFromInterval(0, carColors.length - 1);

        car.make = carMakes[randomMakeIndex];
        car.color = carColors[randomColorIndex];
        car.speed = randomIntFromInterval(0, 100);

        cars.push(car);
    }

    return cars;
}

//We use the function to create an array containing 10 cars. 

const arrayOfCars = generateCars(10); 

console.log(arrayOfCars);

//1.1
//Using .filter we create a new array, only with the elements of the original arrayOfCars that fullfil the min and max requested values (30 and 60).

let carsNewspeed = [];

carsNewspeed = arrayOfCars.filter( car => car.speed > 30 && car.speed < 60 );

console.log(carsNewspeed);

let exersiceOnetoString = JSON.stringify(carsNewspeed);

 document.getElementById('exersiceOne').innerHTML = exersiceOnetoString;

//1.2
// Now again, with the help of filter we only keep the cars of the list which color is not lightyellow, and afterwards, using a for loop we assing only the values of the brands of those to a new array.  

let carsNoLightyellow = [];

carsNoLightyellow = arrayOfCars.filter( car => car.color !== "lightyellow" );

let carsNoLightyellowMake = [];

for (var i = 0; i < carsNoLightyellow.length; i++ ){
    carsNoLightyellowMake[i] = carsNoLightyellow[i].make; 
}
console.log(carsNoLightyellowMake);

let carsToString = JSON.stringify(carsNoLightyellowMake);

document.getElementById('exersiceTwo').innerHTML = carsToString;

//1.3
//Now, we make a function that creates a new object wich properties are going to be exactly the same that the ones that old arrayOfCars had, with the only difference that we are now setting the key names in Danish. Later, we use map to pass the new function to all the objects of the old arrayOfCars.  

function toDanish(arrayOfCars) {
    let carDanish = {};
    carDanish.maerke = arrayOfCars.make;
    carDanish.farve = arrayOfCars.color;
    carDanish.fart = arrayOfCars.speed;
    return carDanish;
}

let carsToDanish = arrayOfCars.map(toDanish);

let carsToDanishToString = JSON.stringify(carsToDanish);

document.getElementById('exersiceThree').innerHTML = carsToDanishToString;

console.log(carsToDanish);

