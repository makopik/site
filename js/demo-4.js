class Particle {

  constructor(canvas, radius, angle, distance, color) {
    this.canvas = canvas;
    this.radius = radius;
    this.angle = angle;
    this.distance = distance;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.speed = 5;
  }
  update() {
    this.distance += -this.speed;
    this.angle += .01;
    this.x = this.canvas.width / 2 + Math.cos(this.angle) * this.distance;
    this.y = this.canvas.height / 2 + Math.sin(this.angle) * this.distance;
    if (this.x > this.canvas.width) {
      this.distance *= -1;
    }
    if (this.x < 0) {
      this.distance *= -1;
    }
    if (this.y > this.canvas.height) {
      this.distance *= -1;
    }
    if (this.y < 0) {
      this.distance *= -1;
    }
  }
}

window.onload = function () {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 1,
        centerY = height / 1,
        particles = [],
        numObjects = 350,
        slice = Math.PI * 2 / numObjects,
        colors = ['', '#2d2d2d', 'red'];

    window.onresize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // RequestAnimationFrame
    (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();


    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }


    function centerBall() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
        var grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 120);
        grd.addColorStop(0.004, 'rgba(255, 239, 239, 1.000)');
        grd.addColorStop(0.324, 'rgba(244, 168, 168, 1.000)');
        grd.addColorStop(0.692, 'rgba(255, 127, 80, 1.000)');
        grd.addColorStop(1.000, 'rgba(51, 51, 51, 1.000)');
        ctx.fillStyle = grd;
        ctx.fill();
    }

    for (let i = 0; i < numObjects; i++) {
        particles.push(new Particle(
            canvas,
            Math.random() * 10 + 16,
            i * slice,
            width * Math.random(),
            randomColor(colors)
        ));
    }

    render();
    function render() {
        ctx.clearRect(0, 0, width, height);
        centerBall();
        for (let i = 0; i < numObjects; i++) {
            var p = particles[i];
            p.update();
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill()
            ctx.restore();
        }
        requestAnimationFrame(render);
    }
}
