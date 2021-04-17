const buttonElement = document.querySelector('#rollButton');
const resultsElement = document.querySelector('#diceResults');
let dice = {4:0, 6:0, 8:0, 10:0, 12:0, 20: 0, 100: 0}; // keys : diceSizes, values: numberOfDice
let diceResults = {}

function rollDie(size) {
    return Math.floor((Math.random() * size) + 1);
}

function rollDice() {
    diceResults = {}; // wipe object
    const diceSizes = Object.keys(dice);
    for(let i = 0; i < diceSizes.length; i++) {
        const currentSize = diceSizes[i];
        const currentNumber = dice[currentSize];
        diceResults[currentSize] = [];
        for(let j = 0; j < currentNumber; j++) {
            const value = rollDie(currentSize);
            diceResults[currentSize].push(value);
            console.log(diceResults);
        }
    }
    displayDiceResults();
}

function displayDiceResults() {
    const diceSizes = Object.keys(diceResults);
    resultsElement.innerHTML = '';
    const tableEle = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');
    const sizeTitle = document.createElement('th');
    sizeTitle.innerHTML = 'Dice Size';
    sizeTitle.scope = 'col';
    tableHeaderRow.appendChild(sizeTitle);
    const valueTitle = document.createElement('th');
    valueTitle.innerHTML = 'Roll Values';
    valueTitle.scope = 'col';
    tableHeaderRow.appendChild(valueTitle);
    tableHeader.appendChild(tableHeaderRow);
    tableEle.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    for(let i = 0; i < diceSizes.length; i++) {
        const currentSize = diceSizes[i];
        const currentValues = diceResults[currentSize];
        // create row
        const newRow = document.createElement('tr');
        // create head
        const newHead = document.createElement('th');
        newHead.innerText = currentSize;
        newRow.appendChild(newHead);
        // create value
        const newValue = document.createElement('td');
        newValue.innerText = currentValues.join(', ');
        newRow.appendChild(newValue);
        tableBody.appendChild(newRow);
    }
    tableEle.appendChild(tableBody);

    resultsElement.appendChild(tableEle);
}

buttonElement.onclick = () => {rollDice()}

const diceSelector = document.querySelector('#diceSelector');

// we need to build a methodology
function displayDiceSelector() {
    // use dice object
    const diceSizes = Object.keys(dice);
    diceSelector.innerHTML = ''; // kill values


    for(let i = 0; i < diceSizes.length; i++) {
        const currentSize = diceSizes[i];
        const currentValue = dice[currentSize];
        const newSection = document.createElement('div');
        newSection.classList = 'diceSection';
        newSection.style = 'display:flex; flex-direction:column';
        // d6
        const titleSpan = document.createElement('span');
        titleSpan.innerText = 'd' + currentSize;
        newSection.appendChild(titleSpan);
        // d6

        // + button
        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.onclick = () => {addDice(currentSize)}
        newSection.appendChild(plusButton);
        // + button

        // Number
        const valueSpan = document.createElement('span');
        valueSpan.innerText = currentValue;
        newSection.appendChild(valueSpan);
        // Number

        // - button
        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.onclick = () => {removeDice(currentSize)}
        newSection.appendChild(minusButton);
        // - button

        diceSelector.appendChild(newSection);

    }
}

function addDice(size) {
    console.log(size);
    dice[size]++;
    displayDiceSelector();
}

function removeDice(size) {
    dice[size]--;
    if(dice[size] < 0) {
        dice[size] = 0;
    }
    displayDiceSelector();
}

displayDiceSelector();
