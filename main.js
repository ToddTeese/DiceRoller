const buttonElement = document.querySelector('#rollButton');
const resultsElement = document.querySelector('#diceResults');
let dice = {6:4}; // keys : diceSizes, values: numberOfDice
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
    const valueTitle = document.createElement('th');
    valueTitle.innerHTML = 'Roll Values';
    valueTitle.scope = 'col';
    tableHeaderRow.appendChild(sizeTitle);
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
