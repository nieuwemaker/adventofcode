const { log } = require('console');
const fs = require('fs');

let currentValue = 50;
let countZero    = 0;

function main(){
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    for(let row of rows){
        setCurrentValue(row);
    }
    console.log(`Safe code is: ${countZero}\n`);
    
}

function setCurrentValue(rowValue){
    let number    = parseInt(rowValue.substring(1));
    let direction = rowValue[0];
    if(direction == "L"){ // lower the number
        currentValue = (currentValue - number) % 100;
    } else {
        currentValue = (currentValue + number) % 100;
    }
    if(currentValue == 0){ countZero++; }
}

main();