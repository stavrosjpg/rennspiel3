const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let car = {
    x: 50,
    y: 100,
    width: 50,
    height: 100,
    speed: 5
};

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    requestAnimationFrame(update);
}

update();
