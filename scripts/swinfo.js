
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

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let charName = characterNameSearch.value.trim();
    searchForm.reset();
    let characterName = document.querySelector('.char-name');
    let characterGender = document.querySelector('.char-gender');
    let characterHomeWorld = document.querySelector('.homeworld');
    let characterFilms = document.querySelector('.films');
    let planetName;
    let filmTitle;
    let objectWitjInfoAboutLookingChar;
    if(getObject(charName)){
        objectWitjInfoAboutLookingChar = getObject(charName);

        getFilm(objectWitjInfoAboutLookingChar)
        .then(data => {
            console.log('Promise one resolved');
            filmTitle = data.title
            return getPlanet(objectWitjInfoAboutLookingChar)
        }).then(data => {
            console.log('Promise two resolved');
            planetName = data.name;
            characterName.innerHTML = objectWitjInfoAboutLookingChar.name;
            characterGender.innerHTML = objectWitjInfoAboutLookingChar.gender;
            characterHomeWorld.innerHTML = planetName;
            characterFilms.innerHTML = filmTitle;
            infoCard.style.display = 'flex';
            }).catch(err => console.log(err.message));
    } else {
        alertMessage.style.display = 'block'
        setTimeout(() => {alertMessage.style.display = 'none';},2000)   
    }
})


async function getPlanet (data){
    return getDetailedInfo(data.homeworld);
}

async function getFilm (data){
    // let = arrayWithFilms = [];
    // data.films.forEach( (film) =>{
    //     arrayWithFilms.push(getDetailedInfo(film));
    //     console.log(arrayWithFilms);
    // });
    console.log(data.films[0])
    console.log(data.films[1])
    console.log(data.films[2])
    return getDetailedInfo(data.films[0]);
}

const getDetailedInfo = async function (resource) {
    const response = await fetch(resource);
    const data = await response.json();
    // console.log(data)
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