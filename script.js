const road = {
    x: 200,
    width: 400
};

const car = {
    x: 370,
    y: 500,
    width: 60,
    height: 100,
    speed: 7
};

const enemies = [];

for (let i = 0; i < 5; i++) {
    enemies.push({
        x: 220 + Math.random() * 320,
        y: -i * 200,
        width: 60,
        height: 100,
        speed: 5
    });
}

const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function drawRoad() {
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#555";
    ctx.fillRect(road.x,0,road.width,canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    for(let y=-40;y<canvas.height;y+=60){
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,y);
        ctx.lineTo(canvas.width/2,y+30);
        ctx.stroke();
    }
}

function drawCar(x,y,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,60,100);
}

function update(){

    if(keys["ArrowLeft"] && car.x>road.x){
        car.x-=car.speed;
    }

    if(keys["ArrowRight"] && car.x<road.x+road.width-car.width){
        car.x+=car.speed;
    }

    drawRoad();

    drawCar(car.x,car.y,"blue");

    enemies.forEach(enemy=>{
        enemy.y+=enemy.speed;

        if(enemy.y>canvas.height){
            enemy.y=-120;
            enemy.x=220+Math.random()*320;
        }

        drawCar(enemy.x,enemy.y,"red");

        if(
            car.x<enemy.x+60 &&
            car.x+60>enemy.x &&
            car.y<enemy.y+100 &&
            car.y+100>enemy.y
        ){
            alert("Game Over");
            location.reload();
        }
    });

    requestAnimationFrame(update);
}

update();
