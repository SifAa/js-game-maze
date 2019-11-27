// Create the actions

//Definer hvad der sker når man bruger controls
function move(a, b){
    if(maze[player.y+a][player.x+b] == 0){
        maze[player.y+a][player.x+b] = p; //players nye position
        maze[player.y][player.x] = 0; //players gamle position
    }else if(maze[player.y+a][player.x+b] == s){
        maze[player.y+a][player.x+b] = p;
        maze[player.y][player.x] = 0;
        plusPoint();
    } else if(maze[player.y+a][player.x+b] == win){
        maze[player.y+a][player.x+b] = p;
        maze[player.y][player.x] = 0;
        tWin = window.setTimeout(function() {
            gameWon();
        }, 2000);
    } else if(maze[player.y+a][player.x+b] == f){
        maze[player.y+a][player.x+b] = p;
        maze[player.y][player.x] = 0;
        tforward = window.setTimeout(function() {
            mazeWon();
        }, 2000);
    }else if(maze[player.y+a][player.x+b] == l){
        maze[player.y+a][player.x+b] = p;
        maze[player.y][player.x] = 0;
        witchlaugh();
        gameOver();
     } else if(maze[player.y+a][player.x+b] == wall){
        thump1();
     }
}

// Point system
function resetPoint() {
    strawberryPoint = 0;
    document.querySelector("#disply-points").innerHTML = strawberryPoint;
}
resetPoint();

function plusPoint() {
    strawberryPoint = strawberryPoint + 1;
    document.querySelector("#disply-points").innerHTML = strawberryPoint;
}

// Definer hvad der sker når man vinder og taber spillet
function gameWon(){
    if (maze == maze3){
         maze = mazeWin;
         triumph1();
     }
     grid();
 }
 
 function mazeWon(){
     if(maze == maze1){
         maze = maze2;
     }
     else if(maze2 == maze){
         maze = maze3;
     }
     grid();
 }
 
 function gameOver(){
     maze = mazeOver;
     replace();
 }

 function replace() {
    var btnValue = document.querySelector("#gamebtn");
    btnValue.innerHTML = "Try again";
 }
 
 function timer(){
     window.setTimeout(function() {
         location.reload();
     }, 3000);
 }

 