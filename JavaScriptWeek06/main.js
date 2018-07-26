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

const button = document.querySelector('#allData');
const content = document.querySelector('#content');
const searchInput = document.querySelector('#search');
const clearButton = document.querySelector('#clear');
const div = document.createElement('DIV');

//A button to clear all the content
clearButton.addEventListener('click', ()=>{
    content.innerHTML = '';
})

//Event listener for the button to get all the repos
button.addEventListener('click', ()=>{
    //We clean the content container
    content.innerHTML = '';
    //we call the getData function inside the addEventListener callback
    searchRepo('https://api.github.com/orgs/HackYourFuture-CPH/repos');
})

// An event listener to search through the repos.
//We target the form input, and we get the value introduced by the user.

searchInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchString = formData.get('searchString');
    // We clear the resoults container
    content.innerHTML = '';

    if (searchString === ''){
        div.innerHTML = `<h3> Please, enter something to search </h3>`;
        content.appendChild(div);
    }
    else {

    //A function to search over the repos, using the API link.
    searchRepo(`https://api.github.com/search/repositories?q=user:HackYourFuture-CPH+${searchString}`);    
  
    } 
})

function searchRepo(url){
    getData(url, (data)=>{ 

        //Fix on the go, if the data we fetch does not have an item property, make it equal to the object itsef, so we can reuse the function.
        if (!data.items){
        data.items = data;
        }    

        console.log(data);
        //Display an "error" messege if theres no input
        if (data.items == 0){
            div.innerHTML = `<h3> Your search didn't had any results. </h3>`;
            content.appendChild(div);
        }
        
        else {
            for (key of data.items){
                const name = key.name;
                const article = document.createElement('ARTICLE');
                const div = document.createElement('DIV');
                const h3 = document.createElement('H3');
                const h3Text = document.createTextNode(name.toUpperCase());
                h3.appendChild(h3Text);
                div.appendChild(h3);
                const ul = document.createElement('UL');
                
                h3.addEventListener('click', ()=>{

                    console.log('click');
                    
                    article.innerHTML= `<p><a href="https://github.com/HackYourFuture-CPH/${name}" target="_blank">Link to the repository</a><br></p>`;
                    div.appendChild(article);
                    const p = document.createElement('P');
                    p.innerHTML = '<b>Contributors: </b>'
                    ul.innerHTML = '';
                    ul.appendChild(p);
                    div.appendChild(ul);
                    
                    getData(`https://api.github.com/repos/HackYourFuture-CPH/${name}/contributors`, (repoInfo)=>{

                        for (key of repoInfo){
                             //console.log(key);
                             const li = document.createElement('LI');
                             const h5 = document.createElement('H5');
                             const h5Text = document.createTextNode(key.login.toUpperCase());
                             h5.appendChild(h5Text);
                             li.appendChild(h5);
                             ul.appendChild(li);
                            //  console.log(key.login);
                             getData(`https://api.github.com/users/${key.login}`, (userInfo)=>{
                                    const divU = document.createElement('DIV');
                                    h5.addEventListener('click', ()=>{

                                        // differente display with and withot bio, depending if the user had added or not
                                        if (userInfo.bio == null ){
                                                divU.innerHTML = 
                                            `<p><b>Name:</b> ${userInfo.name} <br>
                                            <img src="https://avatars0.githubusercontent.com/u/${userInfo.id}?v=4%22" alt="avatar" height="62" width="62"><br>
                                            <b>Number of public repositories:</b> ${userInfo.public_repos}<br>
                                            <b>Number of followers:</b> ${userInfo.followers}</p>`
                                        }

                                        else {
                                            divU.innerHTML = 
                                            `<p><b>Name:</b> ${userInfo.name} <br>
                                            <img src="https://avatars0.githubusercontent.com/u/${userInfo.id}?v=4%22" alt="avatar" height="62" width="62"><br>
                                            <b>Bio:</b> ${userInfo.bio}<br>
                                            <b>Number of public repositories:</b> ${userInfo.public_repos}<br>
                                            <b>Number of followers:</b> ${userInfo.followers}</p>`
                                        }    

                                        li.appendChild(divU);
                                        
                                     })
                                  
                            })                       
                        }
                    })

                })
                content.appendChild(div);
            }
        }           
    });
}   
