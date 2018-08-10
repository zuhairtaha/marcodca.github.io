//Step 1: Closures.
console.log('%c Step 1: Closures', 'font-size: 25px; background: green;')
//First we make a function to create an array filled with the amount of numbers we want. 
function createArray(limit){
    let array = [];
    for( let i=1; i<=limit;i++){
        array.push(i);
    }
    return array
}
//We create an array with number 0-1000.
const arr = createArray(1000);

//A function factory to find the amount of numbers divisible by any number.

function findDivider(divider){
    return function (){
        const arrDivisible =  arr.filter(elem => elem % divider === 0);
        console.groupCollapsed(`The numbers divisible by ${divider} are:`);
         console.log(arrDivisible);
        console.groupEnd();
        console.log(`The amount of numbers divisible by ${divider} are: ${arrDivisible.length}.`)
    }
    return arrDivisible
}
//Divisible by three.
const divisibleByThree = findDivider(3);
divisibleByThree();
//Divisible by ten.
const divisibleByTen = findDivider(10);
divisibleByTen();
//Divisible by twenty one.
const divisibleByTwentyOne = findDivider(21);
divisibleByTwentyOne();

//We create an array with numbers 0-30.
const oneToThirthy = createArray(30);

//We call our function on each of the elements of the array.
oneToThirthy.forEach((elem)=>{
    findDivider(elem)();
})
//Step 2: Continuing with data loading, processing and rendering.

//A function to fecth the data, this time using a Promise.
fetch('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json')
    .then((response)=>{
    response.json()
    .then((movieList)=>{

    // We use an switch statement to add to each element of the movie list a property of 'tag' and the correspondent value, depending on its rating. Note, it's a self invoking function! 
    (function putTag (){
        movieList.map((movie)=>{

            switch(true){

                case (movie.rating >= 7) :
                movie.tag = "Good"
                break;

                case (movie.rating >= 4 && movie.rating < 7 ) :
                movie.tag = "Avarage"
                break;

                case (movie.rating < 4) :
                movie.tag = "Bad"
                break;            
            }
        })
    })();    

    //A function to get the avarage rating of the movies.
    function getAvarage(movies){
        let avarage =  movies.reduce((totalAvarage, nextMovie)=>{
            return (totalAvarage + nextMovie.rating)}, 0)      
        return (avarage  / movies.length);
    }   
    getAvarage(movieList);

    //A variable for the content contianer
    const content = document.querySelector('#content');
    //And displayer of the avarage.
    const avarageDisplay = document.querySelector('#displayAvarage')

    //A function to display the movies.
    function display(data){
        content.innerHTML ='';
            for (const key of data){

                //We create variables for all the elemenst that we need to add to the DOM
                const title = key.title;
                const div = document.createElement('DIV');
                const h3 = document.createElement('H3');
                const h3Text = document.createTextNode(title.toUpperCase());
                h3.appendChild(h3Text);
                div.appendChild(h3);
                const ul = document.createElement('UL');

                //Rating
                const rating = key.rating;
                //Tag
                const tag = key.tag;
                //Year
                const year = key.year;

                ul.innerHTML= `<b>Rating:</b> ${rating} <br>
                            <b>Tag:</b> ${tag} <br>
                            <b>Year:</b> ${year}`

                div.appendChild(ul); 
                content.appendChild(div);
            }
    
            //Display for the avarage of the movies, but with extra decimals please! 
            
            avarageDisplay.innerHTML = Math.floor(getAvarage(data)* 100)/ 100;
            
            //If no tag is selected, lets display an hyphen instead of a NaN, looks better right?
            
            if (avarageDisplay.innerHTML == 'NaN'){
                avarageDisplay.innerHTML = "-"
            }
    }

    //Variable for the form
    const form = document.querySelector('#tagsFilter');
    const allTagsbutton = document.querySelector('#allTags');
    const goodCheck = document.querySelector('#goodCheck');

    //A function to filter the movies depeneding on the tag's checkbox that is selected. We use the event of the form as a parameter.
    //We make and array that is going to contain the tags that we are going to look for.

    tagsTofilter = [];

    const inputs = [...form.childNodes].filter((element)=>{
        return element.type == 'checkbox'
   }); 

    allTagsbutton.onchange = function(e){
        

        if (e.target.checked){
            inputs.forEach((input)=>{
                input.checked = true;
            })
            tagsTofilter = ['Good', 'Avarage', 'Bad'];
            movieListTags = filterTag(tagsTofilter);
            display(movieListTags);
        }
        else{
            inputs.forEach((input)=>{
                input.checked = false;
            })
        }
    }


    //A function to uncheck the button 'check all tags' when one of the tags is de-selected
    function uncheckTheAllButton(){
        inputs.forEach((input)=>{
            if (!input.checked){
                allTagsbutton.checked = false; 
            }
        })
    }

    //And we add an event listener for the change event in the form containing the checkboxes.
    form.addEventListener('change',(e)=>{

        uncheckTheAllButton()

        //if the checkbox is chequed and the tags to filter array does not contain already the value of the checked checkbox, when a change occures, push the value of the checkbox to the array.

        if (e.target.checked && !tagsTofilter.includes(e.target.value)){
            tagsTofilter.push(e.target.value)
        }

        //But if the value of the checkbox is already present in the array of tags, and the checkbox is not chequed, take the value of the event out of the array of tags to filter
        else {
            if (!e.target.checked && tagsTofilter.includes(e.target.value)){
                tagsTofilter.splice(tagsTofilter.indexOf(e.target.value), 1 );
            }
        }  
        
        movieListTags = filterTag(tagsTofilter);
        display(movieListTags);
        return movieListTags;
        
    });


    //Search movie title
    //We add the input, and the event listener to the button.
    const searchInput = document.querySelector('#searchString');

    searchInput.addEventListener('change',searchingString);
    searchInput.addEventListener('keyup',searchingString);

    //A funtion to search given a certain string.
    function searchingString(){
        const searchString = searchInput.value;
        display(findMovies(searchString));
    }

    //A function to look for the movies titles
    function findMovies(stringToSearch){
        let listTosearch;
        if (tagsTofilter.length > 0){
            listTosearch = movieListTags;
        }
        else {
            listTosearch = movieList;
        }

        let filterMovies = listTosearch.filter(movie=>
            movie.title.toLowerCase().includes(stringToSearch.toLowerCase()))
        console.log(filterMovies);
        return filterMovies 
    }

        //A function for filtering the movies depending on their tag    
        function filterTag(tags){
            const filtered = movieList.filter((movie)=>{
                if (tags.some((elem)=>{
                    return elem == movie.tag
                })){
                    return movie
                }
            })
            return filtered;
        }
    })    
})


