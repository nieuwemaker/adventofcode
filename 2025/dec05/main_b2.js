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

    tryToAdd(range){
        console.log(`Starting tryToAdd`);
        if(this.start <= range.start && this.end >= range.end){ 
            console.log(`ALL Range ${range.start} till ${range.end} fits inside range ${this.start} till ${this.end} completely.`);
            return true; } // Complete range within this range, so already integrated
        if(this.start > range.end || this.end < range.start)  { 
            console.log(`NON Range ${range.start} till ${range.end} is completely outside of range ${this.start} till ${this.end}`);
            return false; } // Range completely outside this range
        if(this.start <= range.start && this.end < range.end && this.end > range.start) { 
            console.log(`RIG Range ${range.start} till ${range.end} is added to end of range ${this.start} till ${this.end}`);
            this.end = range.end; // range is extended on the upper side
            return true; 
        } 
        if(this.start > range.start && this.end >=range.end && this.start < range.end )  { 
            console.log(`LEF Range ${range.start} till ${range.end} is added to begin of range ${this.start} till ${this.end}`);
            this.start = range.start; // range is extended on the lower part
            return true;  
        }
        if(this.start > range.start && this.end < range.end){ // Range is bigger in total
            this.start = range.start
            this.end   = range.end;
            return true;
        }
    }

    length(){
        return this.end - this.start + 1;
    }
}

class RangeManager{
    constructor(){
        this.allRanges    = new Array();
        this.uniqueRanges = new Array();
    }

    addRangesToAll(start,end){
        this.allRanges.push(new Range(start,end));
    }

    addRangeToUniqueRanges(range){
        console.log(`Starting addRangeToUniqueRange for ${range.start} - ${range.end}`);
        if(this.uniqueRanges.length == 0){ // You gotta start somewhere, so first is a new range
            this.uniqueRanges.push(new Range(range.start, range.end));
            console.log(`First Range, adding this unique situation`);
            
        } else {
            let createNew = true;
            for(let unique of this.uniqueRanges){
                if(unique.tryToAdd(range)){
                    createNew = false;
                    this.tryIntegrateUniqueRanges();
                    break; //it succeeded to add to range, so done
                }
            }
            if(createNew){this.uniqueRanges.push(new Range(range.start, range.end));}
        }
    }
    // If a range is extended, than perhaps other unique ranges can be integrated too
    tryIntegrateUniqueRanges(){
        console.log(`Starting Integration Uniques`);
        let indexToRemove = new Array();
        for(let i=0;i<this.uniqueRanges.length;i++){
            for(let j=i+1;j<this.uniqueRanges.length;j++){
                if(this.uniqueRanges[i].tryToAdd(this.uniqueRanges[j])){
                    indexToRemove.push(j);
                }
            }
        }
        for(let i=indexToRemove.length-1;i>=0;i--){
            this.uniqueRanges.splice(indexToRemove[i],1);
        }
    }

    printUniques(){
        let total = 0;
        for(let unique of this.uniqueRanges){
            console.log(`Range ${unique.start} till ${unique.end} with length ${unique.length()}`);
            total += unique.length();
        }
        console.log(`Total length is ${total}`);
        
    }
}

// 359526404143221 is not the correct answer
function main(){
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    let rangeInput   = true;
    let rangeManager = new RangeManager();
    for(let row of rows){
        if(row.length == 0){ rangeInput = false; }
        // create ranges
        if(rangeInput){
            let split = row.split('-');
            rangeManager.addRangesToAll(Number(split[0]),Number(split[1]));
        } else {
            break;
        }
    }
    // Step 2: get all unique values from a range
    console.log(`There are ${rangeManager.allRanges.length} ranges documented`);
    for(let range of rangeManager.allRanges){
        rangeManager.addRangeToUniqueRanges(range);
    }
    console.log(`There are ${rangeManager.uniqueRanges.length} unique ranges`);
    rangeManager.printUniques();
    
}

main();