//Set a variable for the limit of times the loop should iterate, and another for the character.
var limit = 10;
var asteriscs = '*';

//set two for loops(nested loop), for each time the first loop iterates trough the limit, another loop inside this one iterates the whole cicle, and duplicates the value of asteriscs. 

for (var i=0; i<limit; i++) {

    for (var j = 0; j < i; j++) {
        
        asteriscs += "*";

    }

console.log(asteriscs);    

}

