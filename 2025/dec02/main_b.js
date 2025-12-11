const fs = require('fs');

class Product{
    constructor(pattern){
        let ids = pattern.split("-");
        this.firstID = Number(ids[0]);
        this.lastID  = Number(ids[1]);
    }

    checkRange(){
        let invalids = new Array();
        // Go through the complete range
        for(let i=this.firstID;i<=this.lastID;i++){
            let stringVersion = i.toString();
            let isInvalid     = false;
            // p is the length of the pattern, that can be 1 digit to half of the ID
            for(let p=1;p<=stringVersion.length/2;p++){
                // Only check if a pattern of that length fits the string
                if(stringVersion.length % p == 0){
                    let pattern      = stringVersion.substring(0,p); // get the pattern to check
                    let patternFound = true;
                    // check it throughout the sequence
                    for(let l=0;l<stringVersion.length;l+=p){
                        //console.log(`checking if ${stringVersion.substring(l,p+l)} is equal to ${pattern} for pattern length ${p}`);
                        if(stringVersion.substring(l,p+l) != pattern){
                            patternFound = false;
                            break;
                        }
                    }
                    if(patternFound){
                        isInvalid = true;
                        break;
                    }
                }
            }
            if(isInvalid){
                invalids.push(i);
                console.log(`Found invalid: ${i}`);
                
            }
        }
        return invalids;
    }
}

function main(){
    let patterns = fs.readFileSync('input.txt', 'utf8').split(",");
    // Create Products
    let products = new Array();
    for(let pattern of patterns){
        products.push(new Product(pattern));
    }
    // Go through all of them
    let totalInvalidSum = 0;
    for(let product of products){
        let invalids = product.checkRange();
        for(let invalid of invalids){
            totalInvalidSum += invalid;
        }
    }
    console.log(totalInvalidSum);
}

main();