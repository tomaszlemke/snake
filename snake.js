const cvs = document.getElementById("wonsz");
const ctx = cvs.getContext("2d");
let abc = document.querySelector('#wynik');

const box = 32;

const ground = new Image();
ground.src = "tlo.png";

const foodImg = new Image();
foodImg.src = "jablko.png";

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

let food = {
    x : Math.floor(Math.random()*18) * box,
    y : Math.floor(Math.random()*18) * box
}

let score = 0;


let d;

document.addEventListener("keydown",direction);

document.getElementById("reset").addEventListener("click", odNowa);

function odNowa(event){
window.location.reload(true);    
}

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function createFood(food){}  

function draw(czas){
    abc.innerHTML = score;
    ctx.drawImage(ground,0,0);
       
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : '#' + parseInt(Math.random() * 0xffffff).toString(16) ;
        
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    if(snakeX == food.x && snakeY == food.y){
       score++;
       makeFood();
        
    }else{
       
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    if(snakeX < 0 || snakeX > 18 * box || snakeY < 0 || snakeY > 18*box || collision(newHead,snake)){
        clearInterval(game);
        ctx.font = "30px Arial";
        ctx.strokeText("Game over", 250, 300);
        setTimeout(()=> {
        
         alert("Koniec");   
          
        }, 110);
        
    }
    snake.unshift(newHead);
}

function makeFood(){
    createFood();
    if(checkIfFoodIsInSnake()){
        makeFood();
    }
}

function createFood(){
    food.x = Math.floor(Math.random()*18) * box;
     food.y = Math.floor(Math.random()*18) * box;
}

function checkIfFoodIsInSnake(){
    for(let i = 0; i<snake.length; i++){
        if(snake[i].x == food.x && snake[i].y == food.y ){
            return true;
        }
    }
    return false;
}

let game = setInterval(draw,100);