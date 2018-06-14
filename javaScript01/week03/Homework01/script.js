//Create a variable for all the weekdays
let weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]

//Make a prompt asiking which day of the week is today

let askWeekDay = prompt('What day of the week is today?', 'monday');

//Make a prompt asiking in how many days you are meeting your friend

let askDays = prompt('In how many days are meeting your friend?', 5);

//convert the string answer of the prompt into an integrer

console.log(askDays);

askDays = parseInt(askDays);

console.log(askDays);

//Create a funtion to calculate the amount of days until the meeting


function numberOfdays(currentDay, nrDays) {

    let nrDaysI = nrDays;

    //Make the anwser of the prompt to lower case.    

    currentDay = currentDay.toLowerCase();

//Make a function for checking what day of the week is gonna be
    
    for (i=0; i<weekDays.length; i++) {
        if (currentDay == weekDays[i]) {
            window.indexDay = weekDays.indexOf(currentDay);
        }
    }

    let control0 = nrDays ;

    nrDays = nrDays + indexDay; 

    
    

//if the answer is 0 display the messege saying that you are meeting today
    
    if (control0 == 0) {
        alert('You are meeting your friend today!, get ready!');
    }


//if the answer and is going to be over the lenght of weekDays, considering the current day, use de modulus to find the correspondent day in the following(s) week(s). Display the alert.     

    else if (nrDays >= weekDays.length) {
        nrDays = nrDays % weekDays.length;
        console.log('reset' , nrDays);
console.log(nrDays, weekDays.length)
        let dayMeeting = weekDays[nrDays ];
    

        alert(`Today is ${currentDay}, you are going to see your friend in ${nrDaysI} days, that's going to be on a ${dayMeeting}.`); 

    }

    //otherwise, display the next day in the same week that match the answer.

    else {
        console.log(nrDays);

        console.log(indexDay);

        let dayMeeting = weekDays[nrDays ];

        alert(`Today is ${currentDay}, you are going to see your friend in ${nrDaysI} days, that's going to be on a ${dayMeeting}.`); 

    }

}

//call the function.

numberOfdays(askWeekDay , askDays);

