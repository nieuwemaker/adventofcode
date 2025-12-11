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
        console.log(`Total for operator ${this.operation} is ${total}`);
        
        return total;
    }
}

function main(){
    let mathFunctions = new Array();
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    for(let r=0;r<5;r++){
        let values = rows[r].split(/\s+/);
        let index  = 0;
        for( let value of values){
            if(value != ''){
                if(r==0){ 
                    mathFunctions.push(new MathFunction()); 
                    mathFunctions[index].addNumber(Number(value));
                } else if( r==4 ){
                    mathFunctions[index].addOperator(value);
                } else {
                    mathFunctions[index].addNumber(Number(value));
                }
                index++;
            }
        }
    }
    //console.log(mathFunctions);
    let total = 0;
    for(let math of mathFunctions){
        total += math.calculate();
    }
    console.log(`The total sum of all functions is ${total}`);
    
}

main();