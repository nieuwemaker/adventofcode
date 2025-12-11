const fs = require('fs');

class Battery{
    constructor(index,value){
        this.index = index;
        this.value = Number(value);
    }

    compareTo(battery){
        if(battery.value > this.value){ return 1; }
        if(battery.value < this.value){ return -1; }
        // If both values are the same, return relative to the index
        return (battery.index > this.index)?-1:1;
    }

    equals(battery){
        return (this.index == battery.index && this.value == battery.value);
    }
}

class Bank{
    constructor(input){
        this.bank    = input;
        this.largest = -1;
        this.digits  = 12;
    }

    // Use oldskool sort algorithm basics and just do it; the bank is short enough and only 2 digits are needed
    findLargestJoltA(){
        let largest = -1;
        for(let i=0;i<this.bank.length-1;i++){
            for(let j=i+1;j<this.bank.length;j++){
                let jolt = Number(`${this.bank[i]}${this.bank[j]}`);
                if(jolt > largest){ largest = jolt;}
            }
        }
        this.largest = largest;
        console.log(`For bank ${this.bank} the largest jolt is ${largest}`);
        return largest;
    }

    /*
     *  OK, so the biggest combination of 12 digits, Yikes!
     */
    findLargestJoltB(){
        // Step 1: Put all batteries in a list
        let batteries = new Array();
        for(let i=0;i<this.bank.length;i++){ batteries.push(new Battery(i,this.bank.charAt(i))); }
        // Step 2: Order all batteries on size and index
        batteries.sort((a, b) => a.compareTo(b));
        console.log(batteries);
        
        // Get biggest possible capacity based on indexes
    }

    getHighestBatteryAfter(collection, selection){
        let currentIndex = this.digits - selection.length;
        
    }

    checkJolt(indexes,currentStart){
        // Create the bank of Digits length
        let checkBankString = "";
        for(let i=0;i<this.digits;i++){
            checkBankString += this.bank.charAt(indexes[i]);
        }
        let checkBankInt = Number(checkBankString);
        // Check against current largest
        if(checkBankInt > this.largest){
            this.largest = checkBankInt;
        }
        // Determine next step
        if(indexes[currentStart] + 1 < this.bank.length && indexes[currentStart] + 1 < indexes[currentStart+1]){ // can we move forward in the current index
            indexes[currentStart]++;
            this.checkJolt(indexes,currentStart);
        } else if(currentStart + 1 < this.bank.length){ // look at the next digit as starting point
            this.checkJolt(indexes,currentStart+1);
        }
    }
}

function main(){
    let rows = fs.readFileSync('test_input.txt', 'utf8').split("\n");
    let sumJoltage = 0;
    for(let row of rows){
        let bank = new Bank(row);
        sumJoltage += bank.findLargestJoltB();
    }
    console.log(`Total output Joltage is ${sumJoltage}`);
    
}

main();