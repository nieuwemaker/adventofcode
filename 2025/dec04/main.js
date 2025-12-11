const fs = require('fs');

const DIR = {LU:0,U:1,RU:2,L:3,C:4,R:5,LD:6,D:7,RD:8};

class Location{
    constructor(x,y, content){
        this.neighbours = [null,null,null,null,null,null,null,null,null];
        this.content    = content;
        this.movable    = true;
        this.x          = x;
        this.y          = y;
    }

    move(){
        this.content = '.';
    }

    addNeighbour(dir, location){
        this.neighbours[dir] = location;
    }

    getNeighBour(dir){
        return this.neighbours[dir];
    }

    countFilledNeighbours(){
        let counter = 0;
        for(let location of this.neighbours){
            if(location != null && location.content == '@'){ counter++; }
        }
        return counter;
    }
}

function main(){
    let locations = new Array();
    let rows = fs.readFileSync('input.txt', 'utf8').split("\n");
    // create locations
    let y=0;
    for(let row of rows){
        locations.push(new Array());
        for(let x=0;x<row.length;x++){
            locations[y].push(new Location(x,y,row.charAt(x)));
        }
        y++;
    }
    // Add neighbours to all locations
    for(let y=0;y<locations.length;y++){
        for(let x=0;x<locations[y].length;x++){
            if(y>0)                   { locations[y][x].addNeighbour(DIR.U,locations[y-1][x])} // UP
            if(y+1<locations.length)  { locations[y][x].addNeighbour(DIR.D,locations[y+1][x])} // DOWN
            if(x>0)                   { locations[y][x].addNeighbour(DIR.L,locations[y][x-1])} // LEFT
            if(x+1<locations[y].length){ locations[y][x].addNeighbour(DIR.R,locations[y][x+1])} // RIGHT
            if(y>0 && x>0)                                     { locations[y][x].addNeighbour(DIR.LU,locations[y-1][x-1])} // LEFT UP
            if(y>0 && x+1<locations[y].length)                 { locations[y][x].addNeighbour(DIR.RU,locations[y-1][x+1])} // RIGHT UP
            if(y+1<locations.length && x>0)                    { locations[y][x].addNeighbour(DIR.LD,locations[y+1][x-1])} // LEFT DOWN
            if(y+1<locations.length && x+1<locations[y].length){ locations[y][x].addNeighbour(DIR.RD,locations[y+1][x+1])} // RIGHT DOWN
        }
    }
    // Check which rolls can be moved
    let counter   = 1;
    let iteration = 1;
    let subtotal  = 0;
    while(counter > 0){
        counter = 0;
        // Step 1: index what can be moves
        for(let y=0;y<locations.length;y++){
            for(let x=0;x<locations[y].length;x++){
                if(locations[y][x].content == '@' && locations[y][x].countFilledNeighbours() < 4 ){ 
                    counter++; 
                    locations[y][x].movable = true;
                } else {
                    locations[y][x].movable = false;
                }
                
            }
        }
        // Step 2: move
        for(let y=0;y<locations.length;y++){
            for(let x=0;x<locations[y].length;x++){
                if(locations[y][x].movable){ locations[y][x].move();}
            }
        }
        console.log(`${iteration}: ${counter} rolls are moved`);
        subtotal += counter;
        iteration++;
    }
    console.log(`A grand total of ${subtotal} could be moved`);
    
    
    // Print the total field
    /*
    for(let y=0;y<locations.length;y++){
        let row = '';
        for(let x=0;x<locations[y].length;x++){
            row += (locations[y][x].movable)?'x':locations[y][x].content;
        }
        console.log(row); 
    }*/
    
}



main();