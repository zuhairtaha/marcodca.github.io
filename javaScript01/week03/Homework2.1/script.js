//Create arrays as global variables for the names of the members of the class, and for the postcodes.

let names = ['Zeeshan', 'Anas', 'Sajid', 'Anuradha', 'Gary', 'Marco', 'Ehsan','Haretha','Krishna', 'Mohammad Azizul Huq','Mohammad Mosiur Rahman','Samara', 'Vignesh', 'Zoey Zou', 'Mohammad Subhiyeh'];

const postcodes = [1000, 1050, 1250, 1300, 1550, 1700, 1950, 2000, 2100, 2200, 2250, 2450];

//create functions to generate, with the help of .random, the postcodes, phonenumbers and grades.

function getRandomPost() {
    return postcodes[Math.floor(Math.random() * postcodes.length) ]
}

function getRandomPhone() {
    return ('4'+ Math.floor(Math.random() * (9999999 - 1111111) + 1111111 )); 
}

function getRandomGrade() {
    return Math.floor(Math.random() * (95 - 60) + 60 );
}

//create a function constructor to generate students objects


function CreateStudent(name, postcode, telephone, course, grade) {
    this.name = name;
    this.postcode = postcode;
    this.telephone = telephone;
    this.course = course;
    this.grade = grade;
}

//create all 14 students

let student1 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student2 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student3 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student4 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student5 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student6 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student7 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student8 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student9 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student10 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student11 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student12 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student13 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student14 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let student15 = new CreateStudent(names.pop(), getRandomPost() , getRandomPhone(), 'Hack Your Future 06', getRandomGrade() );

let arrayOfStudents = [
    student1,
    student2,
    student3,
    student4,
    student5,
    student6,
    student7,
    student8,
    student9,
    student10,
    student11,
    student12,
    student13,
    student14,
    student15
]

console.log(arrayOfStudents);

//A funtion to fin the avarge

function findAvarage(array) {
    let tottal = 0; 

    for (var i = 0; i<array.length; i++){
        tottal += array[i].grade;     
    }
    
    tottal = tottal / array.length ;
    console.log(`The Average of the class is ${tottal} .`);
}

findAvarage(arrayOfStudents);

let grades_ = [] ;

for (var i = 0; i <arrayOfStudents.length; i++) {
    grades_.push(arrayOfStudents[i].grade) ;
}

//A funtion to fin the lowest grade

function findLowestGrade() {

    let minim = Math.min(...grades_);
    
    for (var i = 0; i<arrayOfStudents.length; i++) {
        if (minim == arrayOfStudents[i].grade) {
            let minGrade = arrayOfStudents[i];
            return  console.log(`${minGrade.name} got the lowest grade, he/she scored ${minim}, Keep it up ${minGrade.name}, next time you are gonna do better!`)
        }
    }
    
}

//A funtion to fin the highest


function findHighestGrade() {


    let maxim = Math.max(...grades_);

    for (var i = 0; i<arrayOfStudents.length; i++) {
        if (maxim == arrayOfStudents[i].grade) {
            let maxGrade = arrayOfStudents[i];
            return  console.log(`${maxGrade.name} got the highest grade, he/she scored ${maxim}, Good job ${maxGrade.name}!`)
        }
    }

}

findLowestGrade();

findHighestGrade();












