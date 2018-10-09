var $ = function (id) { return document.getElementById(id); };

var bounce;
var my_canvas;
var ball_array = new Array();
var timer; // global variable to keep current timer

function ball() {
    this.x = Math.random() * my_canvas.canvas.width;
    this.y = Math.random() * my_canvas.canvas.height;
    this.vx = (Math.random() - 0.5); //random step ***change
    this.vy = (Math.random() - 0.5); //random step ***change
    this.speed = 1; // Possible values == -1, 0 and 1 for slow, normal and fast respectively
    this.color = "lightgreen";
    this.radius = 12;
    this.move = ball_move;
    this.draw = ball_draw;
}

function ball_move() {
    // var speedModifier = this.speed * 5;
    this.x += this.vx// * speedModifier;
    this.y += this.vy// * speedModifier;

    if (this.x + this.radius > my_canvas.canvas.width) {
        this.x = my_canvas.canvas.width - this.radius;
        this.vx *= bounce;
    }
    else if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= bounce;
    }
    if (this.y + this.radius > my_canvas.canvas.height) {
        this.y = my_canvas.canvas.height - this.radius;
        this.vy *= bounce;
    }
    else if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= bounce;
    }
}

function ball_draw() {
    my_canvas.save();
    my_canvas.fillStyle = this.color; //****
    my_canvas.strokeStyle = "black";
    my_canvas.lineWidth = 2;
    my_canvas.beginPath();
    my_canvas.arc(this.x, this.y, this.radius, 0, 6.28, false);
    my_canvas.closePath();
    my_canvas.stroke();
    my_canvas.fill();
    my_canvas.restore();
}

function create_balls() {
    for (var i = 0; i < 75; i++) {
        var temp = new ball();
        ball_array.push(temp);
    }
}
function going() {
    var x;
    // erase all balls
    my_canvas.beginPath();
    my_canvas.fillStyle = "#ffd756";
    my_canvas.rect(0, 0, my_canvas.canvas.width, my_canvas.canvas.height);
    my_canvas.fill();

    for (var x = 0; x < ball_array.length; x++) { // Changed this; it"s not very common to use arrays for in
        ball_array[x].move();
        ball_array[x].draw();
    }
}

function resize_can() {
    my_canvas.canvas.width = window.innerWidth / 2;
    my_canvas.canvas.height = window.innerHeight / 2;
}

function applyHeadersRandomColor() {
    var genRandomRGB = function () {
        return Math.round(Math.random() * 255);
    }
    var color = "rgb(" + [genRandomRGB(), genRandomRGB(), genRandomRGB()] + ")";

    $("h1").style.color = color;
    $("h2").style.color = color;
}

function start(rateKey) {
    var rates = {
        "slow": 50,
        "normal": 15,
        "fast": 1
    };

    // Stop
    stop();

    // Start
    timer = setInterval(going, rates[rateKey]);
}

function stop() {
    // stop the animation (if timer is null this do nothing)
    window.clearInterval(timer);
}

function setButtonEvents() {
    // event handler functions
    $("stop").onclick = function () {
        stop();
    };

    $("slow").onclick = function () {
        start("slow");
    };

    $("fast").onclick = function () {
        start("fast");
    };

    $("normal").onclick = function () {
        start("normal");
    };
}

window.onload = function () {
    bounce = -1;
    my_canvas = $("myCanvas").getContext("2d");
    window.onresize = resize_can;
    resize_can();
    create_balls();
    timer = setInterval(going, 5);
    applyHeadersRandomColor();
    setButtonEvents();
};
