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
            if(stringVersion.length % 2 == 0){ // no patterns possible in uneven length strings
                let half = stringVersion.length / 2;
                let firstHalf = stringVersion.substring(0,half);
                let secondHalf = stringVersion.substring(half);
                if(firstHalf == secondHalf){
                    invalids.push(i);
                }
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