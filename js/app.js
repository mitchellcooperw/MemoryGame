/*
 * Create a list that holds all of your cards
 * create counter to track clicked cards
 * create array to hold clicked card html for comparison
 */
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const timer = document.querySelector('.timer');
const popupRestart = document.querySelector('.popup-restart');
const modal = document.querySelector('.modal');
const popup = document.querySelector('.popup');
const statTime = document.querySelector('.statTime');
const statMoves = document.querySelector('.statMoves');
const closePopup = document.querySelector('.close');
const score = document.querySelector('.stars');
let fragment = document.createDocumentFragment();

let shownCardsHTML = [];
let cardNodes = [];
let totalMoves = 0;
let totalMatches = 0;
let interval;
let min = 0 
let sec = 0;

// ------------------LISTENERS-----------------------

// set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
    const clicked = event.target;

// add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    if(clicked.classList.contains('card') && cardNodes.length <= 2 && !clicked.classList.contains('match') && !clicked.classList.contains('open')) {
        toggleClicked(clicked);
        shownCardsHTML.push(clicked.innerHTML);
        cardNodes.push(clicked);

        if(cardNodes.length === 2) {
            updateMoveCounter(cardNodes);
            removeStar();
            compareCards(shownCardsHTML,cardNodes);

            if(totalMoves === 1) {
                elapsedTimer();
            };

            if(totalMatches === 8){
                const scores = document.querySelector('.scores');
                const clonedStars = document.querySelector('.stars').cloneNode(true);
        
                killElapsedTimer();
                timerDisplay(statTime);
                scores.appendChild(clonedStars);
                statMoves.innerHTML = totalMoves;
        
                // if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
                toggleModal('flex');
            };
        };
    };
});

// listener to reset the game
restart.addEventListener('click', function(event) {
    shuffleCards(deck);
    killElapsedTimer();
    statReset();
});

// listener for restart button on popup

popupRestart.addEventListener('click', function(event) {
    const scores = document.querySelector('.scores');
    const stars = scores.querySelector('.stars');

    shuffleCards(deck);
    killElapsedTimer();
    statReset();
    scores.removeChild(stars);
    toggleModal('none');
});

closePopup.addEventListener('click', function(event) {
    toggleModal('none');
});

// ------------------FUNCTIONS-----------------------

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

// remove stars from total score
function removeStar() {
    let starCount = score.childElementCount;

    if(totalMoves >= 9 && (totalMoves) % 3 === 0 && starCount >= 2) {
        score.removeChild(score.firstElementChild);
    };
};

// resets star score display on new game
function resetStars() {
    const loops = score.childElementCount;

    for(var i = loops; i < 5; i++) {
        var star = document.createElement("li");
        star.innerHTML = '<i class="fa fa-star"></i>';
        fragment.appendChild(star);
    };

    score.appendChild(fragment);
};

// add card to array for comparison
function addCard(eventTarget) {
    shownCardsHTML.push(eventTarget.innerHTML);
    cardNodes.push(eventTarget);
};

// resets stats
function statReset() {
    resetStars();
    timer.innerHTML = '00:00';
    totalMoves = 0;
    totalMatches = 0;
    moves.innerHTML = totalMoves;
    min = 0;
    sec = 0;

    if(cardNodes.length > 0) {
        toggleClicked(cardNodes[0]);
        cardNodes = [];
        shownCardsHTML = [];
    };
};

// shuffles cards
function shuffleCards() {
    const cardsNodeList = document.querySelectorAll('.card');
    const cardsArray = Array.from(cardsNodeList);
    const shuffled = shuffle(cardsArray);
    
    shuffled.forEach(function(element) {
        if(element.classList.contains('match')) {
            element.className = 'card';
        };

        deck.appendChild(element);
    });
};

// display the card's symbol (put this functionality in another function that you call from this one)
// toggles classes when a card is clicked
function toggleClicked(event) {
    event.classList.toggle('show');
    event.classList.toggle('open');
    event.classList.toggle('animated');
};

// if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matchCards(events) {
    for(let i = 0; i < 2; i++) {
        events[i].classList.toggle('match');
        events[i].classList.toggle('bounce');
    };
    totalMatches++;
};

// if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function hideCards(events) {
    events[0].classList.toggle('shake');
    events[1].classList.toggle('shake');

    setTimeout(function() {
        toggleClicked(events[0]);
        toggleClicked(events[1]);
        events[0].classList.toggle('shake');
        events[1].classList.toggle('shake');
    }, 500);
};

// increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function updateMoveCounter(array) {
    let cardOne = array[0].className;
    let cardTwo = array[1].className;

    if(!(cardOne === cardTwo)) {
        totalMoves++;
        moves.innerHTML = totalMoves;
    };
};

// if the list already has another card, check to see if the two cards match
function compareCards(compareArray,eventArray) {
    if(shownCardsHTML[0] === shownCardsHTML[1] && cardNodes[0].classList[1] !== cardNodes[1].classList[1]) {
        matchCards(eventArray);
    } else {
        hideCards(eventArray)
    };

    shownCardsHTML = [];
    cardNodes = [];
};

// timer to track elapsed play time
function elapsedTimer() { 
    interval = setInterval(function(){
        sec++;

        if(sec === 60) {
            min++;
            sec = 0;
        };
        timerDisplay(timer);
    },1000);
};

// update timer display
function timerDisplay(element) {
    if(sec < 10 ) {
        element.innerHTML = `${min}:0${sec}`;
    } else {
        element.innerHTML = `${min}:${sec}`;
    };
};

// kills timer
function killElapsedTimer() {
    clearInterval(interval);
};

// toggles modal/popup
function toggleModal(displayString) {
    modal.style.display = displayString;
    popup.style.display = displayString;
};