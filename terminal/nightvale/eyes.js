// The 404 page from my site http://hakim.se/404
document.addEventListener('DOMContentLoaded', () => {

    var DISPLAY_WIDTH = window.innerWidth,
        DISPLAY_HEIGHT = window.innerHeight,
        DISPLAY_DURATION = 10;

    var mouse = { x: 0, y: 0 },
        container,
        canvas,
        context,
        startTime,
        eyes;

    function initialize() {
        container = document.querySelector('.fof');
        canvas = document.querySelector('.fof>canvas');

        if (canvas) {
            canvas.width = DISPLAY_WIDTH;
            canvas.height = DISPLAY_HEIGHT;

            context = canvas.getContext('2d');

            window.addEventListener('mousemove', function (event) {
                mouse.x = event.clientX;
                mouse.y = event.clientY;
            }, false);

            eyes = [
                new Eye(canvas, 0.1, 0.50, 5, 0.10),
            ];

            startTime = Date.now();

            animate();
        }
    }

    function animate() {
        // The number of seconds that have passed since initialization
        var seconds = (Date.now() - startTime) / 1000;

        // Out with the old ...
        context.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

        // ... in with the new
        for (var i = 0, len = eyes.length; i < len; i++) {
            var eye = eyes[i];

            if (seconds > eye.activationTime * DISPLAY_DURATION) {
                eye.activate();
            };

            eye.update(mouse);
        }

        requestAnimFrame(animate);
    }

    setTimeout(initialize, 1);

});


function Eye(canvas, x, y, scale, time) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d')

    // The time at which this eye will come alive
    this.activationTime = time;

    // The speed at which the iris follows the mouse
    this.irisSpeed = 0.01 + (Math.random() * 0.2) / scale;

    // The speed at which the eye opens and closes
    this.blinkSpeed = 0.2 + (Math.random() * 0.2);
    this.blinkInterval = 5000 + 5000 * (Math.random());

    // Timestamp of the last blink
    this.blinkTime = Date.now();

    this.scale = scale;
    this.size = 40 * scale;

    this.x = this.size + x;
    this.y = this.size + y;

    this.iris = {
        x: this.x,
        y: this.y - (this.size * 0.1),
        size: this.size * 0.2
    };

    this.pupil = {
        width: 2 * scale,
        height: this.iris.size * 0.75
    };

    this.exposure = {
        top: 0.1 + (1 * 0.3),
        bottom: 0.5 + (1 * 0.3),
        current: 0,
        target: 1
    };

    // Affects the amount of inner shadow
    this.tiredness = (0.3 - this.exposure.top) + 0.1;

    this.isActive = false;

    this.activate = function () {
        this.isActive = true;
    }

    this.update = function (mouse) {
        if (this.isActive === true) {
            this.render(mouse);
        }
    }

    this.render = function (mouse) {
        var time = Date.now();

        if (this.exposure.current < 0.012) {
            this.exposure.target = 1;
        }
        else if (time - this.blinkTime > this.blinkInterval) {
            this.exposure.target = 0;
            this.blinkTime = time;
        }

        this.exposure.current += (this.exposure.target - this.exposure.current) * this.blinkSpeed;

        // Eye left/right
        var el = { x: this.x - (this.size * 0.8), y: this.y - (this.size * 0.1) };
        var er = { x: this.x + (this.size * 0.8), y: this.y - (this.size * 0.1) };

        // Eye top/bottom
        var et = { x: this.x, y: this.y - (this.size * (0.3 + (this.exposure.top * this.exposure.current))) };
        var eb = { x: this.x, y: this.y - (this.size * (0.4 - (this.exposure.bottom * this.exposure.current))) };

        // Eye inner shadow top
        var eit = { x: this.x, y: this.y - (this.size * (0.5 + ((0.5 - this.tiredness) * this.exposure.current))) };

        // Eye iris
        var ei = { x: this.x, y: this.y - (this.iris.size) };

        // Offset the iris depending on mouse position
        var eio = {
            x: (mouse.x - ei.x) / (window.innerWidth - ei.x),
            y: (mouse.y) / (window.innerHeight)
        };

        // Apply the iris offset
        ei.x += eio.x * 16 * Math.max(1, this.scale * 0.4);
        ei.y += eio.y * 10 * Math.max(1, this.scale * 0.4);

        this.iris.x += (ei.x - this.iris.x) * this.irisSpeed;
        this.iris.y += (ei.y - this.iris.y) * this.irisSpeed;

        // Eye fill drawing
        this.context.fillStyle = 'rgba(102,28,89,255)';
        this.context.strokeStyle = 'rgba(100,100,100,1.0)';
        this.context.beginPath();
        this.context.lineWidth = 0;
        this.context.lineJoin = 'round';
        this.context.moveTo(el.x, el.y);
        this.context.quadraticCurveTo(et.x, et.y, er.x, er.y);
        this.context.quadraticCurveTo(eb.x, eb.y, el.x, el.y);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();

        // Iris
        this.context.save();
        this.context.globalCompositeOperation = 'source-atop';
        this.context.translate(this.iris.x * 0.1, 0);
        this.context.scale(0.9, 1);
        this.context.strokeStyle = 'rgba(0,0,0,0.5)';
        this.context.fillStyle = 'rgba(152,41,136,255)';
        this.context.lineWidth = 0;
        this.context.beginPath();
        this.context.arc(this.iris.x, this.iris.y, this.iris.size, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.restore();

        // Iris inner
        this.context.save();
        this.context.shadowColor = 'rgba(255,255,255,0.5)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        // this.context.shadowBlur = 2 * this.scale;
        this.context.globalCompositeOperation = 'source-atop';
        this.context.translate(this.iris.x * 0.1, 0);
        this.context.scale(0.9, 1);
        this.context.fillStyle = 'rgba(255,255,255,255)';
        this.context.beginPath();
        this.context.arc(this.iris.x, this.iris.y, this.iris.size * 0.7, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.restore();

        // Pupil
        const angle = Math.atan(-this.iris.x,0);
        this.context.save();
        this.context.globalCompositeOperation = 'source-atop';
        this.context.fillStyle = 'rgba(152,41,136,255)';
        this.context.beginPath();
        this.context.arc(this.iris.x+scale*5.3, this.iris.y, this.iris.size * 0.7, angle , angle+Math.PI, true);
        this.context.fill();
        this.context.restore();

        this.context.save();
        this.context.shadowColor = 'rgba(0,0,0,0.9)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 10;


        this.context.restore();

    }
}

// shim with setTimeout fallback from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
