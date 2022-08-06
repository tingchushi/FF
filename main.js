
const mainGame =()=> {
// Canvas setup
const canvas = document.createElement('canvas');
canvas.setAttribute('id','myCanvas');
document.getElementById('container').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia'

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener('mousedown', (event)=>{
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', () => {
    mouse.click = false;
});
const playerLeft = new Image();
playerLeft.src ='./Fish_01200.png';
const playerRight = new Image();
playerRight.src = './Fish_02200.png'
const bubblesRight = new Image();
bubblesRight.src = './Nemo_02.png';
const bubblesLeft = new Image();
bubblesLeft.src = './Nemo_01.png';
const sharkLeft = new Image();
sharkLeft.src ='./Shark_V2_01.png';
const sharkRight = new Image();
sharkRight.src = './Shark_V2_02.png'
// Player
class Player {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight= 327;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx / 20;
        }
        if (mouse.y != this.y){
            this.y -= dy / 20;
        }
    }
    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }

        if (this.x >= mouse.x){
        ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-55, this.y-60, this.spriteWidth/2, this.spriteHeight/2);
    } else {
        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-55, this.y-60, this.spriteWidth/2, this.spriteHeight/2);
    }

  }

}

const player = new Player();


// Bubbles
const fishLeft =[];
const fishRight = []
class Fish {
    constructor(){
        this.x = 0
        this.y = Math.random()* canvas.height;
        this.x1 = 800;
        this.y1 = Math.random() * canvas.height;
        this.radius = 50;
        this.radius1 = 50;
        this.speed = Math.random() * 5 + 1;
        this.speed1 = Math.random() * 5 + 1;
        this.distance;
        this.distance1;
        this.counted =false;
        this.counted1 = false;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight= 327;
    }
    update(){
        this.x += this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt( dx * dx + dy * dy );
    }
    update1(){
        this.x1 -= this.speed1;
        const dx1 = this.x1 - player.x;
        const dy1 = this.y1 - player.y;
        this.distance1 = Math.sqrt( dx1 * dx1 + dy1 * dy1 );
    }
    draw(){

        ctx.drawImage(bubblesLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-25, this.y-25, this.spriteWidth/2, this.spriteHeight/2);

    }
    draw1(){

        ctx.drawImage(bubblesRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x1-25, this.y1-25, this.spriteWidth/2, this.spriteHeight/2);
    }
}

class Enemy {
    constructor(){
        this.x = 0
        this.y = Math.random()* canvas.height;
        this.x1 = 800;
        this.y1 = Math.random() * canvas.height;
        this.radius = 50;
        this.radius1 = 50;
        this.speed = Math.random() * 5 + 1;
        this.speed1 = Math.random() * 5 + 1;
        this.distance;
        this.distance1;
        this.counted =false;
        this.counted1 = false;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight= 327;
    }
    update(){
        this.x += this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt( dx * dx + dy * dy );
    }
    update1(){
        this.x1 -= this.speed1;
        const dx1 = this.x1 - player.x;
        const dy1 = this.y1 - player.y;
        this.distance1 = Math.sqrt( dx1 * dx1 + dy1 * dy1 );
    }
    draw(){

        ctx.drawImage(sharkLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-70, this.y-75, this.spriteWidth/2, this.spriteHeight/2);

    }
    draw1(){

        ctx.drawImage(sharkRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x1-70, this.y1-75, this.spriteWidth/2, this.spriteHeight/2);
    }
}

const enemy = new Enemy();
const scoreCheck = () =>{
    if (score === 100){
        alert("You Win");
        window.location.reload(true);
    }
}

function handleLeftFish(){
    if(gameFrame % 100 == 0){
        fishLeft.push(new Fish());
        fishRight.push(new Fish());
    }
    for (let i = 0; i < fishLeft.length; i++){
        fishLeft[i].update();
        fishLeft[i].draw();

    }
    for (let i = 0; i < fishLeft.length; i++){
        if (fishLeft[i].y < 0){
            fishLeft.splice(i,1);
        }
        if (fishLeft[i].distance < fishLeft[i].radius + player.radius){
            if (!fishLeft[i].counted){
                score++;
                fishLeft[i].counted = true;
                fishLeft.splice(i,1);
                scoreCheck();
            }
        }
      }
    }

    function handleRightFish(){
        if(gameFrame % 100 == 0){
            fishRight.push(new Fish());
        }
        for (let j = 0; j < fishRight.length; j++){
            fishRight[j].update1();
            fishRight[j].draw1();
        }
        for (let j = 0; j < fishRight.length; j++){
            if (fishRight[j].x < 0 ){
                fishRight.splice(j,1);
            }
            if (fishRight[j].distance1 < fishRight[j].radius1 + player.radius){
                if (!fishRight[j].counted1){
                    score++;
                    fishRight[j].counted1 = true;
                    fishRight.splice(j,1);
                    scoreCheck();
                }
            }
          }
        }
let live = 3;

let shark = [];
let shark1 = [];
const liveConditionCheck = () => {
    if (live === 0){
        alert("You Lost");
        cancelAnimationFrame();
        window.location.reload(true);
    }
} 
        function handleEnemy(){
            if(gameFrame % 500 == 0){
                shark.push(new Enemy());
            }
            for (let j = 0; j < shark.length; j++){
                shark[j].update();
                shark[j].draw();
            }
            for (let j = 0; j < shark.length; j++){
                if (shark[j].distance < player.radius){
                    if (!shark[j].counted){
                        live--;
                        alert("You have bitten by Shark!! You still have " + live + " Life.");
                        console.log(live)
                        shark[j].counted = true;
                        }
                        liveConditionCheck();
                    }
                }
        }
        

        function handleEnemy1(){
            if(gameFrame % 800 == 0){
                shark1.push(new Enemy());
            }
            for (let j = 0; j < shark1.length; j++){
                shark1[j].update1();
                shark1[j].draw1();
            }
            for (let j = 0; j < shark1.length; j++){
                if (shark1[j].distance1 < player.radius){
                    if (!shark1[j].counted1){
                        live--;
                        alert("You have bitten by Shark!! You still have " + live + " Life.");
                        console.log(live)
                        shark1[j].counted1 = true;
                        }
                            liveConditionCheck();
                    }
                }
        }
// Animation Loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleLeftFish();
    console.log(handleLeftFish());
    handleRightFish();
    handleEnemy();
    handleEnemy1();
    player.update();
    player.draw();
    gameFrame++;
    requestAnimationFrame(animate);
    const total = document.getElementById('total');
    total.innerText = 'Score: ' + score + ' /100 Life: ' + live + '/3';
    const bar = document.getElementById('bar');
    bar.style.width = score * 8 + 'px'
}


animate();

}

const box = document.createElement('div');
box.setAttribute('id','box');
box.style.border = '4px solid black';
box.style.width = "800px";
box.style.height = '500px';
box.style.backgroundImage = "url('bg.jpg')";
box.innerText = 'Frenzy Feeding'
box.style.textAlign = 'center';
box.style.fontSize = '120px';
box.style.justifyContent = 'center';
document.head.append(box);
let button = document.createElement("button");
button.innerHTML = 'Welcome to Frenzy Feeding           Game Start';

button.setAttribute('id','button')
button.onclick = function()
{
    mainGame();

    button.style.display ='none';
    box.style.display = 'none';
    const restart = document.createElement('button');
    restart.innerHTML = 'Restart Game';
    container.appendChild(restart);
    restart.innerHTML = 'Restart Game';
    restart.setAttribute('id','restart')
    restart.onclick = function() {
        window.location.reload(true);   
        //mainGame();
    }


}
document.body.appendChild(button);
