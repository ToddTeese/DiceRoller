// ELEMENTS
const buttonElement = document.querySelector('#rollButton');
const resultsElement = document.querySelector('#diceResults');
const diceSelector = document.querySelector('#diceSelector');
// ELEMENTS

// DATA
let dice = {4:0, 6:0, 8:0, 10:0, 12:0, 20: 0, 100: 0}; // keys : diceSizes, values: numberOfDice
let diceResults = {}
// DATA


// DICE FUNCTIONS
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
        }
    }
    displayDiceResults();
}

function addDice(size) {
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
// DICE FUNCTIONS

// DATA MANIPULATION
function getTotal(values) {
    let total = 0;
    for(let i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total;
}
// DATA MANIPULATION

// VIEW ELEMENT
function newElement(type, innerHTML, options) {
    const newEle = document.createElement(type);
    newEle.innerText = innerHTML;
    
    if(options != undefined) {
        const optionKeys = Object.keys(options);
        for(let i = 0; i < optionKeys.length; i++) {
            const currentOption = optionKeys[i];
            newEle[currentOption] = options[currentOption];
        }
    }
    return newEle;
}
// VIEW ELEMENT

// DISPLAY
function displayDiceResults() {
    const diceSizes = Object.keys(diceResults);
    resultsElement.innerHTML = '';
    const tableEle = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');

    // add dice size header
    tableHeaderRow.appendChild(newElement('th', 'Dice Size', {scope:'col'}));

    // add roll values
    tableHeaderRow.appendChild(newElement('th', 'Roll Values', {scope:'col'}));

    // add roll totals
    tableHeaderRow.appendChild(newElement('th', 'Roll Totals', {scope:'col'}));

    tableHeader.appendChild(tableHeaderRow);
    tableEle.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    for(let i = 0; i < diceSizes.length; i++) {
        const currentSize = diceSizes[i];
        const currentValues = diceResults[currentSize];
        // create row
        const newRow = document.createElement('tr');
        // create head
        newRow.appendChild(newElement('th', currentSize));
        // create value
        newRow.appendChild(newElement('td', currentValues.join(', ')));
        // create total
        newRow.appendChild(newElement('td', getTotal(currentValues)));

        tableBody.appendChild(newRow);
    }
    tableEle.appendChild(tableBody);

    resultsElement.appendChild(tableEle);
}

function displayDiceSelector() {
    // use dice object
    const diceSizes = Object.keys(dice);
    diceSelector.innerHTML = ''; // kill values

    for(let i = 0; i < diceSizes.length; i++) {
        const currentSize = diceSizes[i];
        const currentValue = dice[currentSize];
        
        // const newSection = document.createElement('div');
        const newSection = newElement('div', '', {classList: 'diceSection', style: 'display:flex; flex-direction:column'});

        // d6
        newSection.appendChild(newElement('span', 'd' + currentSize));

        // + button
        newSection.appendChild(newElement('button', '+', {onclick: () => {addDice(currentSize)}}));

        // Number
        newSection.appendChild(newElement('span', currentValue));

        // - button
        newSection.appendChild(newElement('button', '-', {onclick: () => {removeDice(currentSize)}}));

        diceSelector.appendChild(newSection);

    }
}
// DISPLAY

buttonElement.onclick = () => {rollDice()}

displayDiceResults();

displayDiceSelector();
