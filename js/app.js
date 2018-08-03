/*
 * Create a list that holds all of your cards
 * create counter to track clicked cards
 * create array to hold clicked card html for comparison
 */
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const timer = document.querySelector('timer');

let shownCardsHTML = [];
let cardNodes = [];
let totalMoves = 0;
let totalMatches = 0;


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
    }

    return array;
}

// set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
    const clicked = event.target;

    if (totalMoves >= 9 && totalMoves % 2 !== 0) {
        updateScore(1);
    };

// add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    shownCardsHTML.push(clicked.innerHTML);
    cardNodes.push(clicked);

// display the card's symbol (put this functionality in another function that you call from this one)
    if(clicked.classList.contains('card') && cardNodes.length <= 2 && !clicked.classList.contains('match')) {
        toggleClicked(clicked);

        if(cardNodes.length === 2) {
            updateMoveCounter(cardNodes);
            compareCards(shownCardsHTML,cardNodes);
            console.log(totalMoves);
            if(totalMoves === 1) {
                elapsedTimer(totalMatches);
                console.log('start');
            }
        };
    };
});

restart.addEventListener('click', function(event) {
    shuffleCards(deck);
});

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
    updateScore(totalMoves);

    totalMoves = 0;
    moves.innerHTML = totalMoves;
};

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
    }
};

function updateScore(moves) {
    let score = document.querySelector('.stars');

    if(!totalMoves == 0) {
        score.removeChild(score.childNodes[0]);
    } else {
        for(var i = totalMoves; i < 5; i++){
            score.appendChild(score.childNodes[0]);
        };
    }
    
};

// if the list already has another card, check to see if the two cards match
function compareCards(compareArray,eventArray) {

    if(shownCardsHTML[0] === shownCardsHTML[1]) {
        matchCards(eventArray);
    } else {
        hideCards(eventArray)
    };

    shownCardCount = 0;
    shownCardsHTML = [];
    cardNodes = [];
}

function elapsedTimer(triggerInt) {
    let hr = 0; 
    let min = 0 
    let sec = 0;

    let interval = setInterval(function(){
        sec++;
        console.log(sec);
    },1000);

    if(sec === 60) {
        min++;
        sec = 0;
    };

    if(min === 60) {
        hr++;
        min = 0;
    };

    if(triggerInt === 8) {
        clearInterval(interval);
    }
};

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
