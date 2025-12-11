const fs = require('fs');

class MathFunction{
    constructor(){
        this.numbers   = new Array();
        this.operation = '';
    }

    addNumber(number){
        this.numbers.push(number);
    }

    addOperator(op){
        this.operation = op;
    }

    calculate(){
        let total = this.numbers[0];
        for(let i=1;i<this.numbers.length;i++){
            let number = this.numbers[i];
            if(this.operation == '+'){ total += number; }
            if(this.operation == '-'){ total -= number; }
            if(this.operation == '*'){ total *= number; }
            if(this.operation == '/'){ total /= number; }
        }
        return total;
    }
}

function main(){
    let mathFunctions = new Array();
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    // run right to left through the columns
    let totalRows            = rows.length;
    let createNewFunction    = true;
    let functions            = new Array();
    let currentFunctionIndex = -1;
    for(let c=rows[0].length-1;c>=0;c--){
        // Get all data from 1 column
        let colData = new Array();
        for(let r=0;r<totalRows;r++){
            colData.push(rows[r].charAt(c));
        }
        if(createNewFunction){ 
            functions.push(new MathFunction() );
            currentFunctionIndex++;
            createNewFunction = false;
        }
        // See if it is a split between numbers
        if(isAllSpaces(colData)){
            createNewFunction = true;
        } else { // Else construct the number and add things to the mathFunction
            let number   = "";
            let operator = colData[colData.length-1];
            for(let r=0;r<colData.length-1;r++){ number+= colData[r]; }
            if(operator.length > 0) { functions[currentFunctionIndex].addOperator(operator); }
            functions[currentFunctionIndex].addNumber(Number(number));
        }
    }
    let total = 0;
    for(let math of functions){
        total += math.calculate();
    }
    console.log(`The total sum of all functions is ${total}`);
    
}

function isAllSpaces(data){
    for(let char of data){
        if(char != ' '){
            return false;
        }
    }
    return true;
}

main();