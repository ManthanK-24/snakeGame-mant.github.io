// Game constants and variables
let inputDir = {x:0,y:0};
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");

let lastPaintTime = 0;
let speed = 5;
let snakeArr = [
    {x:13,y:15}
]
let food = {x:10,y:8};
let score = 0 ;
// Game Functions

function main(ctime){
  window.requestAnimationFrame(main);     // RequestAnimationFrame is Better Than SetIntervals  
//  console.log(ctime);                    // It gives highest FPS for any hardware system
 if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
 }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    
    for(let i=1;i<snakeArr.length;i++){
        // If you collide with yourself
        if(snake[i].x === snake[0].x && snake[i].y ===snake[0].y)
        {
            return true;
        }
        
    } 
    // If you collide with wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0)
    {
        return true;
    }
    return false;
    
}
function gameEngine(){
    // Part 1: Update the Snake Array and Food
      if(isCollide(snakeArr)){
        gameOverSound.play();
       // musicSound.pause();
        alert("Game Over. Press any key to play again");
        //musicSound.play();
        snakeArr = [{x:13, y:15}];
        inputDir = {x:0,y:0};
        score = 0;
      }
      // If snake eaten the food, increase the score and reset the food location
      if(snakeArr[0].x===food.x && snakeArr[0].y ===food.y){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore:" + hiscoreval;
        }
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round( a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
      } 
     // Move the Snake
     for(let i=snakeArr.length-2;i>=0;i--)
     {
        snakeArr[i+1] = {...snakeArr[i]}; // spread operator
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y; 

   // Part 2: Display the Snake and Food
   board.innerHTML = "";
   snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    // Adding CSS through Javascript 
    snakeElement.style.gridRowStart = e.y;   // Because (0,0) is at top-left of matrix
    snakeElement.style.gridColumnStart = e.x;
    if(index===0){
        snakeElement.classList.add('head');
    }
    else{
    snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
   })
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;   // Because (0,0) is at top-left of matrix
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main Logic Starts here
 let hiscore = localStorage.getItem('hiscore');
 if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
 }
 else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = 'Hiscore:' + hiscoreval;
 }

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
