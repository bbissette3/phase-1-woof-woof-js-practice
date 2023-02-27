//wait for page to load
//then call fetchPups
document.addEventListener('DOMContentLoaded', fetchPups)

//send a fetch request to our API
function fetchPups() {
    fetch('http://localhost:3000/pups')
    //wait for response
    //conver to JSON
    .then(response => response.json())
    //pass the array of objects
    //to addAllPups
    .then(pups => addAllPups(pups))
};

function addAllPups (pups) {
    //grab the div with id of dog-bar
    const dogBar = document.getElementById('dog-bar')
    //iterate over the array of pup object
    pups.forEach((pup) => {
        //create a span for each element
        const newDogSpan = document.createElement('span')
        //set the span inner text to the name
        newDogSpan.innerText = pup.name
        //add the id to the span
        newDogSpan.dataset.id = pup.id
        //attach a click event listener to span
        newDogSpan.addEventListener('click', handlePupClick)
        //add the span to the div with id dog-bar
        dogBar.append(newDogSpan)
    });
};

function handlePupClick(e) {
    //fetch to the dynmaic
    //interpolate the data-id attribute
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
    //convert response to JSON
    .then(response => response.json())
    //pass the data to addOnePup
    .then(pupData => addOnePup(pupData))
};

function addOnePup(pup) {
    //grab the div with id dog-info
    const dogInfo = document.getElementById('dog-info')
    //clear the div
    dogInfo.innerHTML = ''
    //create an img tag
    const pupImage = document.createElement('img')
    //set img src attribute to image key from pup object
    pupImage.src = pup.image
    //create an h2 with pup's name
    const pupName = document.createElement('h2')
    pupName.innerText = pup.name
    //create a button element
    const dogButton = document.createElement('button')
    //conditionally render button text
    //based on isGoodDog boolean value
    dogButton.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    dogButton.addEventListener('click', handlePupButton)
    //append  new  img, h2, button tag to div#dog-info
    dogInfo.append(pupImage, pupName, dogButton)
};

function handlePupButton(e) {
    if (e.target.innerText === 'Good Dog!') {
        e.target.innerText = 'Bad Dog!'
    } else {
        e.target.innerText = 'Good Dog!'
    }
};