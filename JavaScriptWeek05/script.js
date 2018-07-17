//Homework
//Step 1
function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
    var arr = [];
    for (var i = 0; i <= stopIndex-startIndex; i++){
        arr.push(startIndex + i);      

    }
    console.log(arr);
    for (var i = 0; i < arr.length; i++ ){
        if (arr[i] % 3 === 0 && arr[i] % 5 === 0){
            threeCallback(arr[i]);
            fiveCallback(arr[i]);
        }
        else if (arr[i] % 3 === 0 ){
            threeCallback(arr[i]);
        }
        else if (arr[i] % 5 === 0 ){
            fiveCallback(arr[i]);
        }
    }
}

function divByThree(elem){
    console.log(`It seems that ${elem} is divisible by three, that is so cool!`);
}

function divByFive(elem){
    console.log(`It seems that ${elem} is divisible by five, that is just awsesome!`);
}

console.log(threeFive(4, 36, divByThree,divByFive));

//8
//A way of iteratinf through a multidimensional array (that we dont know the amount of dimenssions of it), is with a recursive function. In this case we are making a function that takes the array as a parameter, logs each one of its elements, and check if those values are themself another array. If they are, IT CALLS ITSELF (here is the catch) upon the element...quite cool.

var matrix = [1,2,[3,4,],5,1,2,[3,41,2,[3,4,],5,6,],5,66];

function multidimArray(arr){ 

for (var i = 0; i < arr.length; i++){
    console.log(arr[i]);
    if (Array.isArray(arr[i])){
        multidimArray(arr[i]);
    }
    }
}

multidimArray(matrix);

//9
//When assigning values to variables, if the are primitives (null, undefined, booleans, strings or nrs) js creates a new and indipendent space in memory and set it equals to the value, but when refering to objects instead, the assigment what does is to adress to the original value, without creating a new space in memory (pass by reference), so if the original value is changued, the value of the new variable that was refering to it will changue as well. Its very cleared explained in here: https://codeburst.io/javascript-passing-by-value-vs-reference-explained-in-plain-english-8d00fd06a47c Arrays examples.
var x = 9; 
function f1(val) { 
    val = val+1; 
    return val;
}
f1(x);
console.log(x);


var y = { x: 9 };
function f2(val) {
    val.x = val.x + 1;
    return val;
}
f2(y);
console.log(y);

//Step 3

var btn = document.querySelector('#btn');

btn.addEventListener('click', function () {

    //HTTP request

    var http = new XMLHttpRequest();
    http.open('GET', "https://api.github.com/orgs/HackYourFuture/repos", true);
    http.send();
    
    http.onreadystatechange = processRequest;


    function processRequest() {
        if (http.readyState == 4 && http.status == 200) {
            var response = JSON.parse(http.responseText);
            console.log(response);
            for (var i = 0; i < response.length; i++ ){

                for (const prop in response[i]){
                        if (prop == "name"){
                            var list = document.createElement("UL");
                            document.querySelector('#excer3').appendChild(list);

                            var h3 = document.createElement('H3');
                            var nameNode = response[i][prop].toUpperCase();
                            var textnode = document.createTextNode(nameNode);
                            h3.appendChild(textnode);
                            list.appendChild(h3);

                            var link = document.createElement('A');
                            var linkText = document.createTextNode('Link');
                            link.appendChild(linkText);
                            var linkHref = ' https://github.com/HackYourFuture/' + response[i][prop];
                            link.setAttribute('href',linkHref );
                            list.appendChild(link);

                            var forksNr = document.createElement('P');
                            forkNode = document.createTextNode(`Number of forks: ${response[i].forks}`);
                            forksNr.appendChild(forkNode);
                            list.appendChild(forksNr);

                            var lang = document.createElement('P');
                            var langNode;
                            if (response[i].language == null){
                                continue; 
                            }
                            else {
                            langNode = document.createTextNode(`Language: ${response[i].language}`);
                            }
                            lang.appendChild(langNode);
                            list.appendChild(lang); 
                        }    
                        
                    }               
            }
        }
    }
})

console.log('This messege appearing before the response is the prove that the call was asyncronus') 
