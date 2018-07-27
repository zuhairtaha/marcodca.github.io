//A function to get random number, with a max parameter.
function getRandom(max){
    return  Math.floor(Math.random() * max)
}

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


// We are calling the fecth function to get a random pokemon from 1 to 152. Could be up to a greater number, but we are old school and like first generation only.

getData(`https://pokeapi.co/api/v2/pokemon-species/${getRandom(152)}/`, (data)=>{

    //Getting the html elements
    const hint = document.querySelector('#hint');
    const messeges =  document.querySelector('#messeges');
    const buttonGiveUp = document.querySelector('#giveUp');
    const buttonPlayAgain =  document.querySelector('#playAgain');
    

    // A variable for the pokemon name
    const name = data.name;
    console.log(name);

    const flavArray = [];
    //We make an array containing only the flavor text entries which language is english.
    for (let i = 0; i < data.flavor_text_entries.length; i++){
        if (data.flavor_text_entries[i].language.name == 'en'){
            flavArray.push(data.flavor_text_entries[i]);
        }
    }
    console.log(flavArray);

    // Now we get a random flavor text from the array.
    
    let flavText = flavArray[getRandom(flavArray.length)].flavor_text.toLowerCase();

    //Sometimes the flavor text contains the name of the pokemon itself in the description, if so, we assign again the variable until we get a flavor text that does not contain the name on it. We use includes(name) in order to make the filter.

    while (flavText.includes(name)){
        console.log('filter!');
        flavText = flavArray[getRandom(flavArray.length)].flavor_text.toLowerCase();
    }
        hint.innerHTML = `<p>${flavText}</p>`

    console.log(flavText);

    //Getting the answer input

    const answerInput = document.querySelector('#answer');

    answerInput.addEventListener('submit',(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const answerString = formData.get('answerString');

        if (answerString.toLowerCase() == name){
            getData(`https://api.giphy.com/v1/gifs/search?q=${name}&api_key=y6cLtap8SATIo05Inq4QAg2vkrXZK68P&limit=5`, (info => {
                console.log(info);
                const img = info['data'][getRandom(info['data'].length)].images.preview_gif.url;
                console.log(img);
                messeges.innerHTML = `<p>CORRECT!, you are a real pokemon master!</p><br><img src=${img}>`
            }))
            

        }
        else {
            messeges.innerHTML = `<p> Not quite, try again.</p>`
        }
    })

    //We configure the button to a different behavor depeendig if the user has won or not
    
    buttonGiveUp.addEventListener('click',()=>{
            messeges.innerHTML = `<p>The anwser was ${name}</p>`
        })
        
        buttonPlayAgain.addEventListener('click', ()=>{
            location.reload();
        })

})

