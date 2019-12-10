// Draw the game
let canvas = document.querySelector("#canvas");

let ctx = canvas.getContext('2d');

// definer variabler
let x;
let y;

let p = 8;
let player;
let playerStart;
let strawberryPoint = 0;

let wall = 1;
let win = 2; // where you win the game
let l = -4; // enemy tile that makes you lose
let f = 4; // brings you to the next maze
let s = 5; // point in form of strawberries

let tileSize = 50;

let count = 0;

// Images from timefantasy.net free graphics
let fairy = new Image(); // For at loade billedet skal der nederst på siden stå
fairy.src = 'media/tiles/fairy_green.png'; // window.addEventListener("load", grid)
let witch = new Image();
witch.src = 'media/tiles/witch_green.png'

// Image from pixelartmaker.com/gallery
let treetop = new Image();
treetop.src = 'media/tiles/bush_green.png'

// Image from https://images.cdn3.stockunlimited.net/clipart/wooden-house_2008885.jpg
let house = new Image();
house.src = 'media/tiles/woodenhouse_green.png'

// My images
let strawberry = new Image();
strawberry.src = 'media/tiles/strawberry_green.png';
let arrow = new Image();
arrow.src = 'media/tiles/arrow_green.png'

// hardcode spillets plader

let maze0 =
[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let maze1 =
[
    [1, 1, f, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, s, 1],
    [1, 0, 1, l, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, p, 1, 1],
];
let maze2 =
[
    [1, 1, 1, f, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, s, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, l, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, s, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, p, 1, 1, 1],
];
let maze3 = 
[
    [1, 1, win, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, s, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, s, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, s, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, l, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, p],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let mazeOver = 
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let mazeWin = 
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let maze = maze1;

function grid(){

    if (maze == maze3){
        tileSize = 25;
    }

    if (maze == mazeWin){
        tileSize = 25;
    }
    
    if (maze == mazeOver){
        tileSize = 20;
    }

    for(y = 0; y < maze.length; y++){
        
        for (x = 0; x < maze[y].length; x++){
            if(maze[y][x] == p){
                player = {y,x}; // koordinater for player
                ctx.drawImage(fairy, x*tileSize, y*tileSize, tileSize, tileSize);
            } else if(maze[y][x] == wall){
                ctx.drawImage(treetop, x*tileSize, y*tileSize, tileSize, tileSize);
                // ctx.fillStyle = "#1c7311";
                // ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if(maze[y][x] == win){
                ctx.drawImage(house, x*tileSize, y*tileSize, tileSize, tileSize);
            } else if(maze[y][x] == f){
                ctx.drawImage(arrow, x*tileSize, y*tileSize, tileSize, tileSize);
            } else if(maze[y][x] == s){
                ctx.drawImage(strawberry, x*tileSize, y*tileSize, tileSize, tileSize);
            } else if(maze[y][x] == l){
                ctx.drawImage(witch, x*tileSize, y*tileSize, tileSize, tileSize);

                /////// orange circle ///////
                // ctx.strokeStyle = "orange";
                // ctx.lineWidth = 5;
                // ctx.beginPath();
                // ctx.arc(x * tileSize+(tileSize/2), y * tileSize+(tileSize/2), tileSize/3, 0, 2 * Math.PI);
                // ctx.stroke();
            } else {
                ctx.fillStyle = "#9ee236";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Definer controls
window.addEventListener('keydown', function(event){
    switch (event.keyCode) {
        case 37: //KeyLeft
        move(0, -1);
        grid();    
            break;
        case 38: //KeyUp
        move(-1, 0);
        grid();
            break;
        case 39: //KeyRight
        move(0, 1);
        grid();
            break;
        case 40: //KeyDown
        move(1, 0);
        grid();
            break;
    
        default: 
            break;
    }
})

// Define button
let btn = document.querySelector("#gamebtn");

btn.addEventListener('click', function () { location.reload(); });

// Audio functions
function witchlaugh(){
    let laughAud = new Audio('media/witchlaugh.mp3');
    laughAud.play();
}

function thump1(){
    let thumpAud = new Audio('media/thump1.mp3');
    thumpAud.play();
}

function triumph1(){
    let triumphAud = new Audio('media/triumph1.mp3');
    triumphAud.play();
}

// moving enemies
setInterval(mEnemy, 500);

let maze1EnemyPositions = [
    {posY: 6, posX: 3},
    {posY: 5, posX: 3},
    {posY: 4, posX: 3},
    {posY: 3, posX: 3},
    {posY: 4, posX: 3},
    {posY: 5, posX: 3},
    {posY: 6, posX: 3}
];
let maze2EnemyPositions = [
    {posY: 3, posX: 6},
    {posY: 3, posX: 5},
    {posY: 3, posX: 4},
    {posY: 3, posX: 3},
    {posY: 4, posX: 3},
    {posY: 5, posX: 3},
    {posY: 6, posX: 3},
    {posY: 6, posX: 4},
    {posY: 6, posX: 5},
    {posY: 6, posX: 6},
    {posY: 5, posX: 6},
    {posY: 4, posX: 6},
    {posY: 3, posX: 6}
];
let maze3EnemyPositions = [
    {posY: 16, posX: 12},
    {posY: 16, posX: 11},
    {posY: 16, posX: 10},
    {posY: 16, posX: 9},
    {posY: 16, posX: 8},
    {posY: 16, posX: 7},
    {posY: 16, posX: 6},
    {posY: 16, posX: 5},
    {posY: 16, posX: 4},
    {posY: 16, posX: 3},
    {posY: 16, posX: 4},
    {posY: 16, posX: 5},
    {posY: 16, posX: 6},
    {posY: 16, posX: 7},
    {posY: 16, posX: 8},
    {posY: 16, posX: 9},
    {posY: 16, posX: 10},
    {posY: 16, posX: 11},
    {posY: 16, posX: 12}
];
// let maze3EnemyPositions2 = [
//     {posY: 12, posX: 18},
//     {posY: 11, posX: 18},
//     {posY: 10, posX: 18},
//     {posY: 9, posX: 18},
//     {posY: 8, posX: 18},
//     {posY: 7, posX: 18},
//     {posY: 6, posX: 18},
//     {posY: 5, posX: 18},
//     {posY: 6, posX: 18},
//     {posY: 7, posX: 18},
//     {posY: 8, posX: 18},
//     {posY: 9, posX: 18},
//     {posY: 10, posX: 18},
//     {posY: 11, posX: 18},
//     {posY: 12, posX: 18}
// ]

function mEnemy(){
    if(maze == maze1){
        if (maze[maze1EnemyPositions[count].posY][maze1EnemyPositions[count].posX] == p){
            witchlaugh();
            gameOver();
        }
        maze[maze1EnemyPositions[count].posY][maze1EnemyPositions[count].posX] = l; 
        if(count >=1){
            maze[maze1EnemyPositions[count-1].posY][maze1EnemyPositions[count-1].posX]= 0;
        }
        if(count == 6){
            count = 0;  
        }
        count++
        grid();
    } else if(maze == maze2){
        if (maze[maze1EnemyPositions[count].posY][maze1EnemyPositions[count].posX] == p){
            witchlaugh();
            gameOver();
        }
        maze[maze2EnemyPositions[count].posY][maze2EnemyPositions[count].posX] = l; 
        if(count >=1){
            maze[maze2EnemyPositions[count-1].posY][maze2EnemyPositions[count-1].posX]= 0;
        }
        if(count == 12){
            count = 0;  
        }
        count++
        grid();
    } else if(maze == maze3){
        if (maze[maze1EnemyPositions[count].posY][maze1EnemyPositions[count].posX] == p){
            witchlaugh();
            gameOver();
        }
        maze[maze3EnemyPositions[count].posY][maze3EnemyPositions[count].posX] = l; 
        if(count >=1){
            maze[maze3EnemyPositions[count-1].posY][maze3EnemyPositions[count-1].posX]= 0;
        }
        if(count == 18){
            count = 0;  
        }
        count++
        grid();
    }
    // if(maze1){ //move enemy repeatedly 3 tiles up and then back down
        
    // }
    // if(maze2){ //move enemy repeatedly 3 tiles left, 3 tiles down, 3 tiles right and 3 tiles up
    // }
    // if(maze3) //move one enemy repeatedly 9 tiles left and back
}

// function loop array
 

grid();
window.addEventListener("load", grid);