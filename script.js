const quotes = ["If there's a prize for rotten judgement, I guess I've already won that.",
"No man is worth the aggravation, that's ancient history, been there, done that.",
"No chance, no way, I won't say it, no, no.",
"I thought my heart had learned its lesson.",
"I am a damsel, I am in distress, I can handle it, have a nice day."
];




let WordQueue;
let highlightPosition;
let startTime;

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

function startGame() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    highlightPosition = 0;
    wordQueue = quoteText.split(' ');

    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    quote.childNodes[highlightPosition].className = 'highlight';

    input.focus();
    input.value = '';
    message.innerText = '';

    startTime = new Date().getTime();

    document.body.className = "";
    start.className = 'started';
    setTimeout(() => {start.className = "button";}, 2000);
}

function checkInput(){
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(",",""); // sets first word in array to currentWord
    const typedValue = input.value.trim(); //gets value from input and removes spaces

    if (currentWord !== typedValue){
        input.className = currentWord.startsWith(typedValue) ? '' : 'error';
        return;
    }

    wordQueue.shift(); //removes the first item in the word queue array
    input.value = ''; //empties textbox
    quote.childNodes[highlightPosition].className = '';

    if (wordQueue.length === 0) {
        gameOver();
        return;
    }

    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    message.innerHTML = `<span class="congrats">Congratulations!</span>
    <br>You finished in ${elapsedTime/1000} seconds.`;
    document.body.className = 'winner';
}

start.addEventListener('click', startGame);
input.addEventListener('input',checkInput);