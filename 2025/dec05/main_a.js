const fs = require('fs');

class Range{
    constructor(start, end){
        this.start = start;
        this.end   = end;
    }

    inRange(input){
        return input >= this.start && input <= this.end;
    }
}
function main(){
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    let rangeInput = true;
    let ranges = new Array();
    let freshCounter = 0;
    for(let row of rows){
        if(row.length == 0){ rangeInput = false; }
        // create ranges
        if(rangeInput){
            let split = row.split('-');
            ranges.push(new Range(Number(split[0]),Number(split[1])));
        } else { // chack ranges
            let isFresh = false;
            for(let range of ranges){
                if(range.inRange(Number(row))){
                    isFresh = true;
                    freshCounter++;
                    break;
                }
            }
        }
    }
    console.log(`There are ${freshCounter} fresh ingredients`);
    
}

main();