const { log, count } = require('console');
const fs = require('fs');

let currentValue    = 50;
let countZero       = 0;
let goesThroughZero = 0;

function main(){
    let rows = fs.readFileSync('test_input.txt', 'utf8').split("\n");
    for(let row of rows){
        //setCurrentValue(row);
        changeCurrentValue(row);
    }
    console.log(`CountZero is: ${countZero}\nGoesThroughZero is: ${goesThroughZero}\n Answer is: ${countZero+goesThroughZero}\n`);
    
}

function changeCurrentValue(rowValue){
    // Step 1: seperate direction and number
    let rawNumber       = parseInt(rowValue.substring(1));
    let totalTurnNumber = Math.floor(rawNumber/100);
    let restNumber      = rawNumber % 100;
    let direction       = rowValue[0];
    for(let i=0;i<rawNumber;i++){
        if(direction == "L"){ (currentValue--)%100; }
        else                { (currentValue++)%100; }
        if(currentValue == 0 && (i+1) < rawNumber){
            goesThroughZero++;
        }
    }
    if(currentValue == 0){ countZero++; }
}

function setCurrentValue(rowValue){
    // Step 1: seperate direction and number
    let rawNumber       = parseInt(rowValue.substring(1));
    let totalTurnNumber = Math.floor(rawNumber/100);
    let restNumber      = rawNumber % 100;
    let direction       = rowValue[0];
    // Step 2: check if the change will pass zero on the normal count
    if(direction == "L" && (currentValue - restNumber) < 0 ){
        goesThroughZero++;
    } else if(direction == "R" && (currentValue + restNumber) > 100){
        goesThroughZero++;
    }
    // Step 3: Add all the times you turn through 0
    goesThroughZero += totalTurnNumber;
    // Step 4: change the value and check if 0 is new value
    if(direction == "L"){ // lower the number
        currentValue = (currentValue - rawNumber) % 100;
    } else {
        currentValue = (currentValue + rawNumber) % 100;
    }
    if(currentValue == 0){ countZero++; }
}


main();