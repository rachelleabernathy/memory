
const DOWN = 'down';
const UP = 'up';
let startingX = 100;
let startingY = 100;
let cards = [];
const gameState = {
    totalPairs: 8,
    flippedCards: [],
    numMatched: 0,
    attempts: 0,
    waiting: false
};

let cardfaceArray = [];
let cardback;
function preload() {
    cardback = loadImage('images/cardback.jpeg');
    cardfaceArray = [
        loadImage('images/chicken.png'),
        loadImage('images/fox.png'),
        loadImage('images/frog.png'),
        loadImage('images/koala.png'),
        loadImage('images/monkey.png'),
        loadImage('images/panda.png'),
        loadImage('images/pig.png'),
        loadImage('images/tiger.png'),
    ]
}

function setup () {
    createCanvas(650, 800);
    selectedFaces = suffleArray(selectedFaces);
    for (let z = 0; z < 8; z++) {
        const randomIdx = floor(random(cardfaceArray.length));
        const face = cardfaceArray[randomIdx];
        selectedFaces.push(face);
        selectedFaces.push(face);
        //remove the used cardface so it doesn't get randomly selected again
        cardfaceArray.splice(randomIdx, 1);
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            const cardFaceImg = selectedFaces.pop();
            cards.push(new Card(startingX, startingY, faceImg));
            startingX += 120;
        }
        startingY += 150;
        startingX = 100;
    }
}

function draw () {
    background('lightgreen');
    if (gameState.numMatched === gameState.totalPairs) {
        fill('yellow');
        textSize(66);
        text('You Win!', 400, 425),
        noLoop();
    }
    for (let k = 0; k < cards.length; k++) {
        if(cards[k].isMatch) {
            cards[k].face = DOWN;
        }
        cards[k].show();
    }
    noLoop();
    gameState.flippedCards.length = 0;
    gameState.waiting = false;
    fill(255);
    textSize(36);
    text('attempts' + gameState.attempts, 100, 500);
    text('matches' + gameState.numMatched, 100, 450);
}

function mousePressed () {
    if (gameState.waiting) {
        return;
    }
    for (let k = 0; k < cards.length; k++) {
        console.log('gameState', gameState);
        // first check flipped cards length, and then we can trigger the flip
        if (gamesState.flippedCards.lenght < 2 && cards[k].clicked(mouseX, mouseY)) {
            console.log('flipped', cards[k]);
            gameState.flippedCards.push(cards[k]);
            
        }
    } 
    if (gameState.flippedCards.length === 2) {
        if (gameState.flippedCards[0]. cardFaceImg === gameState.flippedCards[1].cardFaceImg) {
            //mark cards as matched so they don't flip back
            gameState.flippedCards[0].isMatch = true;
            gameState.flippedCards[1].isMatch = true;
            //empty flipped cards array
            gameState.flippedCards.length = 0;
            //increment the score
            gameState.numMatched++;
            loop();
        } else {
            gameState.waiting = true;
            const loopTimeout = window.setTimeout(() => {
                loop();
                window.clearTimeout(loopTimeout);
            }, 1000)
        }
    }
}

class Card {
    constructor (x, y, cardFaceImg) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 100;
        this.face = DOWN;
        this.cardFaceImg = cardFaceImg;
        this.isMatch = false;
        this.show();
    }

    show () {
        if(this.face === UP || this.isMatch) {
            fill('yellow');
            rect(this.x, this.y, this.width, this.height, 10);
            image(this.cardFaceImg, this.x, this.y);   
        } else {
            fill('teal');
            rect(this.x, this.y, this.width, this.height, 10);
            image(cardback, this.x, this.y);
        }
    
    }
    clicked (mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
                this.flip();
                return true;
            } else {
                return false;
            }
    }
    flip () {
        if (this.face === DOWN) {
            this.face =UP;
        } else {
            this.face = DOWN;
        }
        this.show();
    }
}

function shuffleArray (array) {
    let counter = array.length;
    while (counter > 0) {
        //pick random index
        const idx = Math.floor(Math.random() * counter);
        //decrease counter by 1 (decrement)
        counter--;
        //swap the last element with it
        const temp = array[counter];
        array[counter] = array[idx];
        array[idx] = temp;
    }
    return array;
}