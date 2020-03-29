
 let arrayOfObjectsWithCharactersInfo = [];
const getAllCharactersData =  (() => {
    const resourceArray = [
        'https://swapi.co/api/people/',
        'https://swapi.co/api/people/?page=2',
        'https://swapi.co/api/people/?page=3',
        'https://swapi.co/api/people/?page=4',
        'https://swapi.co/api/people/?page=5',
        'https://swapi.co/api/people/?page=6',
        'https://swapi.co/api/people/?page=7',
        'https://swapi.co/api/people/?page=8',
        'https://swapi.co/api/people/?page=9',
    ]
    // getting data from the server
    const getStarWatsCharactersInfo = async function (resource){ // async function always returns a promise
        const response = await fetch(resource); // return promise
        const data = await response.json(); // json() is async function
        return data.results
    }
    resourceArray.forEach(api => {
        getStarWatsCharactersInfo(api).then(data => {
            arrayOfObjectsWithCharactersInfo = [...arrayOfObjectsWithCharactersInfo,...data];
            // console.log(arrayOfObjectsWithCharactersInfo);
        }).catch(err => console.log(err.message));
        return arrayOfObjectsWithCharactersInfo;
    })
    return { arrayOfObjectsWithCharactersInfo };
})();



// check if input field name match any object of an array with data
// if match - take necessery data and display them

const characterNameSearch = document.querySelector('#character-name');
const searchForm = document.querySelector('.search-character');
const infoCard = document.querySelector('.card-info');
const alertMessage = document.querySelector('.alert-container');
let characterName = document.querySelector('.char-name');
let characterGender = document.querySelector('.char-gender');
let characterHomeWorld = document.querySelector('.homeworld');
const filmTitlesContainer = document.querySelector('.titles-container');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let charName = characterNameSearch.value.trim();
    searchForm.reset();
    let filmsTitleArray =[];
    let objectWitjInfoAboutLookingChar;
    if(getObject(charName)){
        objectWitjInfoAboutLookingChar = getObject(charName);
    // fetch on every array element! (DO NOT FETCH on whole array of elements!!)
    Promise.all(objectWitjInfoAboutLookingChar.films
                        .map((singleFilmUrl => fetch(singleFilmUrl)
                        .then(response => response.json()))))
                        .then(films => {
                            films.forEach(film => {
                                filmsTitleArray.push(film.title);
                            })
                            return getDetailedInfo(objectWitjInfoAboutLookingChar.homeworld);
                        }).then(planet => {
                            updateUI(objectWitjInfoAboutLookingChar.name, objectWitjInfoAboutLookingChar.gender, planet.name, filmsTitleArray)
                        }).catch(err => {throw new Error()});
    } else {
        alertMessage.style.display = 'block'
        setTimeout(() => {alertMessage.style.display = 'none';},2000)   
    }
})


function updateUI (name, gender, planet, films) {
            document.querySelectorAll('.films').forEach(title => {
                title.remove();
            });
            characterName.innerHTML = name;
            characterGender.innerHTML = gender;
            characterHomeWorld.innerHTML = planet;
            films.forEach(film => {
                const div = document.createElement('div');
                div.classList.add('films');
                div.innerHTML = film;
                filmTitlesContainer.appendChild(div);
            })
            infoCard.style.display = 'flex';
}


const getDetailedInfo = async function (resource) {
    const response = await fetch(resource);
    const data = await response.json();
    return data;
}

function getObject(charName) {
    let object;
    arrayOfObjectsWithCharactersInfo.forEach((obj,index) => {
        if(obj.name == charName) {
            object = arrayOfObjectsWithCharactersInfo[index];
        } 
    });
    return object;
}







// const getStarWarsCharacter = (resource) => {

//     return new Promise((resolve, reject) =>{
//      const request = new XMLHttpRequest(); // request object - send request to the browser

//         request.addEventListener('readystatechange', () => {
//         if(request.readyState === 4 && request.status === 200){ // when transfer of the data is done
//             const data = JSON.parse(request.responseText) // converting json string into array of objects
//             resolve(data);
//         } else if(request.readyState === 4){
//             reject('could not fetch data');
//         }
//         });
        
//         request.open('GET', resource); // metoda z dwoma paramterami (type of request, from where?)
//         request.send(); //sending request 
//     });
// };

// getStarWarsCharacter('https://swapi.co/api/people/?page=2').then(data =>{
//     console.log('promise 1 resolved:', data.results);
// })