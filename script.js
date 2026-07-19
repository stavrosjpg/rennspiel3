const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


let gameStarted = true;


const road = {
    x:200,
    width:400
};


const car = {
    x:370,
    y:480,
    width:60,
    height:110,
    speed:8,
    color:"blue"
};


const colors=[
"red",
"yellow",
"black",
"lime",
"purple",
"orange"
];


const enemies=[];


for(let i=0;i<6;i++){

    enemies.push({

        x:road.x+30+Math.random()*300,
        y:-i*200,
        speed:4+Math.random()*3,
        color:colors[Math.floor(Math.random()*colors.length)]

    });

}



const keys={};


document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});


document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});



// Handy Buttons

document.getElementById("left").ontouchstart=()=>{
    keys["ArrowLeft"]=true;
};

document.getElementById("left").ontouchend=()=>{
    keys["ArrowLeft"]=false;
};


document.getElementById("right").ontouchstart=()=>{
    keys["ArrowRight"]=true;
};

document.getElementById("right").ontouchend=()=>{
    keys["ArrowRight"]=false;
};




function drawRoad(){

    ctx.fillStyle="#2d8a32";
    ctx.fillRect(0,0,800,600);


    ctx.fillStyle="#333";
    ctx.fillRect(
        road.x,
        0,
        road.width,
        600
    );


    ctx.strokeStyle="white";
    ctx.lineWidth=6;


    ctx.beginPath();
    ctx.moveTo(road.x,0);
    ctx.lineTo(road.x,600);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(road.x+road.width,0);
    ctx.lineTo(road.x+road.width,600);
    ctx.stroke();



    for(let y=0;y<600;y+=80){

        ctx.beginPath();
        ctx.moveTo(400,y);
        ctx.lineTo(400,y+40);
        ctx.stroke();

    }

}



function drawCar(x,y,color){


    // Schatten
    ctx.fillStyle="rgba(0,0,0,0.4)";
    ctx.fillRect(x+5,y+8,60,105);


    // Auto
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.roundRect(x,y,60,110,12);
    ctx.fill();


    // Fenster
    ctx.fillStyle="#9eeaff";
    ctx.fillRect(x+12,y+20,36,30);


    // Reifen
    ctx.fillStyle="black";

    ctx.fillRect(x-5,y+20,8,25);
    ctx.fillRect(x+57,y+20,8,25);
    ctx.fillRect(x-5,y+70,8,25);
    ctx.fillRect(x+57,y+70,8,25);


    // Licht
    ctx.fillStyle="yellow";
    ctx.fillRect(x+10,y+5,10,6);
    ctx.fillRect(x+40,y+5,10,6);

}





function update(){


    if(keys["ArrowLeft"] && car.x>road.x){
        car.x-=car.speed;
    }


    if(keys["ArrowRight"] && car.x<road.x+road.width-60){
        car.x+=car.speed;
    }



    drawRoad();


    drawCar(
        car.x,
        car.y,
        car.color
    );



    enemies.forEach(enemy=>{


        enemy.y+=enemy.speed;


        if(enemy.y>600){

            enemy.y=-150;

            enemy.x=
            road.x+
            Math.random()*320;

            enemy.color=
            colors[
            Math.floor(Math.random()*colors.length)
            ];

        }



        drawCar(
            enemy.x,
            enemy.y,
            enemy.color
        );



        if(
            car.x<enemy.x+60 &&
            car.x+60>enemy.x &&
            car.y<enemy.y+110 &&
            car.y+110>enemy.y
        ){

            alert("💥 Unfall!");
            location.reload();

        }

    });



    requestAnimationFrame(update);

}


update();
