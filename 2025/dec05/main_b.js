const { log } = require('console');
const fs = require('fs');

class Range{
    constructor(start, end){
        this.start = start;
        this.end   = end;
    }

    inRange(input){
        return input >= this.start && input <= this.end;
    }

    getAllInRange(){
        let range = new Array();
        for(let i=this.start;i<=this.end;i++){
            range.push(i);
        }
        return range;
    }

    length(){
        return this.end - this.start + 1;
    }
}
function main(){
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    let rangeInput   = true;
    let ranges       = new Array();
    let uniqueIDs    = new Map();
    for(let row of rows){
        if(row.length == 0){ rangeInput = false; }
        // create ranges
        if(rangeInput){
            let split = row.split('-');
            ranges.push(new Range(Number(split[0]),Number(split[1])));
        } else {
            break;
        }
    }
    // Step 2: get all unique values from a range
    console.log(`There are ${ranges.length} ranges documented`);
    for(let range of ranges){
        console.log(`Length of range is ${range.length()}`);
        
        
        /*
        for(let id of range.getAllInRange()){
            
            
            if(!uniqueIDs.has(id)){
                uniqueIDs.set(id,1);
                console.log(uniqueIDs.size);
                
            } else {
                //uniqueIDs.get(id) = uniqueIDs.get(id)+1;
            }
        }*/
    }
    console.log(`There are ${uniqueIDs.size} unique ID's`);
    
}

main();