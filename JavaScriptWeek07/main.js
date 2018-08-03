//Step 01
//1
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function doubleOdd (arr) {
   return arr.filter((number)=> number % 2 !==0)
    .map((number)=> number * 2)
};

//2

function getAjaxData(url, callback) {
    // Create new ajax call with the js function called XMLHttpRequest
    const request = new XMLHttpRequest();
    request.addEventListener('load', function () {

        if (this.status === 200) {
            callback(JSON.parse(request.responseText));
        } else {
            console.log('Something is probably wrong with the url');
        }
    });

    request.addEventListener('error', function () {
        console.log('Server error like timeout');
    });

    // initializes a request with an http method
    request.open("GET", url);
    // Sends the request 
    request.send();
}

getAjaxData("https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json", (movieList)=>{

    //console.log(movieList);
// i
//We use an switch statement to add to each element of the movie list a property of 'tag' and the correspondent value, depending on its rating. 
    function putTag (){
        movieList.map((movie)=>{

            switch(true){

                case (movie.rating >= 7) :
                movie.tag = "Good"
                break;

                case (movie.rating >= 4 || movie.rating < 7 ) :
                movie.tag = "Average"
                break;

                case (movie.rating < 4) :
                movie.tag = "Bad"
                break;
                
            }
        })
    }    

    putTag(movieList);

//ii
//We get the avarage using reduce and dividing the total on the length of the movieList.

const averageRating = movieList.reduce((total, elem)=> total + elem.rating /movieList.length, 0);

console.log(`The avarage rating of all the movies is ${averageRating}.`);

//iii
//To count the amount of each tag, we use reduce, with an empty object as the accumulator. Through each iteration the method is gonna check if theres a property in the object that we are creating with the name of the tag that we are checking, if it doesent exist, its gonna create it, and for each time it appears, is going to be incremented by one.

const numberOfTags = movieList.reduce((list, item)=>{
    if (!list[item.tag]){
        list[item.tag] = 0;
    }
    list[item.tag]++;
    return list

},{});

console.table(numberOfTags); 
console.log(`The list contains a total of ${numberOfTags.Good} 'Good' movies, ${numberOfTags.Average} 'Average' movies, and 0 'bad' movies`);

//iv
//For this exersice I really could not figure out a smart way of doing it, so I just...

const keywords = ["The", "dog", "who", "is", "not", "a", "man"];

//made an array containing only the movies titles, using map. The titles are taken to lower case, and splited so each word is an element.

const movieTitles = movieList.map((item)=>
    item.title 
         .toLowerCase()
         .split(' ')
    );

//afterwards, using a nested loop, we  check te coincidence of all the keywords in all the titles. We usea a 'break;' to exit the loop when the first coincidence is find, and doing so we assure that we dont count twice a movie if the title contains more than one key word.

let total = 0;

for (let i = 0; i < movieTitles.length; i++){
    for (let j = 0; j < keywords.length; j ++ ){
        if (movieTitles[i].includes(keywords[j].toLowerCase())){
            //console.log(movieTitles[i],' includes ', keywords[j]);       
            total++;
            break;
        }
    }
}

console.log(`There are a total of ${total} movie's titles containing the keywords "${keywords}" .`);

//To get a more detailed overview, we repeat the nested for loop, using an object as a counter, so we can know exactly how many times each word is present in the titles. NOTICE that we are not using the "breack;" in this loop, so is going to count all the instances of a word, even if differents words appear in the same titile, or if a same word is repeted in the same titile. 

let counter = {
    the: 0,
    dog: 0,
    who: 0,
    is: 0,
    not: 0,
    a: 0,
    man:0,
}

for (let i = 0; i < movieTitles.length; i++){
    for (let j = 0; j < keywords.length; j ++ ){
        if (movieTitles[i].includes(keywords[j].toLowerCase())){
            counter[keywords[j].toLowerCase()]++    
        }
    }
}

console.table(counter);

//We use .filter one more time to check the year the movies were made. We aim at the correct range to get only the movies that were produced in the period that we are interested.

const eightiesMovies = movieList.filter(movie=> movie.year >=1980 && movie.year <= 1989);

console.log(`There are a total of ${eightiesMovies.length} movies that were done in between 1980 and 1989.`);

});
//Step 02
//A function to fetch data
function getData(url, callback){
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.send();
    req.onreadystatechange = getRequest;
    function getRequest(){
        if (req.readyState == 4 && req.status == 200) {
            var response = JSON.parse(req.responseText);
            callback(response);
         }
    }
}    

// Globar variables for all the buttons and content containers.

const content = document.querySelector('#content');
const div = document.createElement('DIV');

//buttons
const filterIssuesButton = document.querySelector('#filterIssues');
const mostForksButton = document.querySelector('#mostForks');
const totalStargazersButton = document.querySelector('#totalStargazers');
const avarageWatchersButton = document.querySelector('#avarageWatchers');
const updatedLastMonthButton = document.querySelector('#updatedLastMonth');
const SortDateCreatedButton = document.querySelector('#SortDateCreated');
const resetButton = document.querySelector('#reset');
const chuckNorrisButton = document.querySelector('#chuckNorris');

//We make the function to get all the repos
function getRepos(url){
    content.innerHTML ='';

    getData(url,(data)=>{

        // Filter only the repos with issues
        function filterIssues(){
            data = data.filter((elem)=> elem.has_issues == true)
            display(data);
        }
        //Add the event listener to the button
        filterIssuesButton.addEventListener('click', ()=>{
            filterIssues();
        })

        //Repo with most amount of forks
        function moreForks(){
            sorting = data.sort((repoA, repoB)=>{
                return repoB.forks - repoA.forks  
            })
            data = []
            data.push(sorting[0]);
            display(data);
        }
        //Add the event listener to the button
        mostForksButton.addEventListener('click',()=>{
            moreForks();
        })

        //Avarage number of watchers
        function ShowAvarageWatcher(){
            avarageWList = data.map(repo => repo.watchers ) ;
            avarageWatchers = avarageWList.reduce((total, nextRepo) =>{
                return (total + nextRepo) / avarageWList.length
            })
            content.innerHTML =
            `<ul><li><b>The avarage number of watchers of all the repos is: </b>  ${avarageWatchers}</li></ul>`
        }

        avarageWatchersButton.addEventListener('click', ()=>{
            ShowAvarageWatcher();
        })
        //avarageWatcher();

        //Total amount of stagazers...whatever they are.
        function totalStargazers(){
            stargazersList = data.map(repo => repo.stargazers_count)
            stargazersTotal =  stargazersList.reduce((total, nextRepo)=>{
                return total + nextRepo
            })
            content.innerHTML =
                         `<ul><li><b>The total number of stargazers of all the repos is:</b>  ${stargazersTotal}</li></ul>`
        }
        //Add the event listener to the button
        totalStargazersButton.addEventListener('click', ()=>{
            totalStargazers();
        })

        //Only the repos that has been updated in the last month

        function updatedLastMonth(){
            //We create a new Date variable, and we get the current time.
            let time = new Date();
            let timeNow = time.getTime();

            data.forEach((elem)=>{
                elem.date_updated =  Date.parse(elem.updated_at);
            })
            data = data.filter(repo => repo.date_updated >= (timeNow - 2419200000));
            display(data);
        }
        updatedLastMonthButton.addEventListener('click',()=>{
            updatedLastMonth();
        })
    

        //Sort by creation date
        function sortByDate (){
            data.forEach((elem)=>{
                elem.date_created =  Date.parse(elem.created_at);
            })

            data = data.sort((repoA, repoB)=>{
                return repoA.date_created > repoB.date_created ? -1 : 1;
            })
            display(data);
        }

        SortDateCreatedButton.addEventListener('click', ()=>{
            sortByDate();
        })

        //A random Chuck Norris joke
        function chuckNorrisJoke(){
            getData('http://api.icndb.com/jokes/random', ((joke)=>{
                content.innerHTML =
                `<ul><li><b>${joke.value.joke}</li></ul>`
            }
            ))}
        
            chuckNorrisButton.addEventListener('click', chuckNorrisJoke);    
      
    //A function to display the content in the HTML    
    function display(info){
        content.innerHTML ='';
            for (key of info){

                //We create variables for all the elemenst that we need to add to the DOM
                const name = key.name;
                const div = document.createElement('DIV');
                const h3 = document.createElement('H3');
                const h3Text = document.createTextNode(name.toUpperCase());
                h3.appendChild(h3Text);
                div.appendChild(h3);
                const ul = document.createElement('UL');

                //Watchers
                const li = document.createElement('LI');
                const watchers = key.watchers;
                //Forks
                const forks = key.forks;
                //Stargazers
                const stargazers = key.stargazers_count;
                //Issues
                const issues = key.has_issues == true ? ' Yes' : ' No';
                //Created
                const created = key.created_at.split('T')[0];
                //Updated
                const updated = key.updated_at.split('T')[0];
            
                ul.innerHTML= `<b>Numbers of watchers:</b> ${watchers} <br>
                            <b>Numbers of forks:</b> ${forks} <br>
                            <b>Numbers of stargazers:</b> ${stargazers} <br>
                            <b>Has issues:</b> ${issues} <br>
                            <b>Date of creation: </b> ${created} <br>
                            <b>Las time updated:</b> ${updated} `

                div.appendChild(ul); 
                content.appendChild(div);
                }
            }
        display(data);
    })


}

 document.addEventListener('load',getRepos('https://api.github.com/orgs/HackYourFuture-CPH/repos'));
 resetButton.addEventListener('click', ()=> getRepos('https://api.github.com/orgs/HackYourFuture-CPH/repos'));