/*
 * Create a list that holds all of your cards
 * create counter to track clicked cards
 * create array to hold clicked card html for comparison
 */
const deck = document.querySelector('.deck');
let shownCardCount = 0
let shownCardsHTML = []
let cardNodes = []

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
deck.addEventListener('click', function(event){
    const clicked = event.target;
    // console.log(clicked);

// display the card's symbol (put this functionality in another function that you call from this one)
    if(clicked.classList.contains('card') && shownCardCount < 2) {
        toggleClicked(clicked);

// track number of clicked cards to avoid too many shown
        shownCardCount++;
        // console.log(shownCardCount);

// add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
        shownCardsHTML.push(clicked.innerHTML);
        // console.log(shownCardsHTML);

        cardNodes.push(clicked);
        // console.log(cardNodes);

        if(cardNodes.length === 2) {
            compareCards(shownCardsHTML,cardNodes);
        };
    }
});

function toggleClicked(event) {
    event.classList.toggle('show');
    event.classList.toggle('open');
    event.classList.toggle('animated');
}

// if the list already has another card, check to see if the two cards match
function compareCards(compareArray,eventArray) {
    console.log(shownCardsHTML[0] === shownCardsHTML[1]);

    if(shownCardsHTML[0] === shownCardsHTML[1]) {
        console.log('1');
        matchCards(eventArray);
    } else {
        console.log('2');
        hideCards(eventArray)
    };

    shownCardCount = 0;
    shownCardsHTML = [];
    cardNodes = [];
}

// if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matchCards(events) {
    for(let i = 0; i < 2; i++) {
        events[i].classList.toggle('match');
        events[i].classList.toggle('bounce');
    };
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


/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
