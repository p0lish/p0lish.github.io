class StarField {
    constructor(game, color, size, numOfStars) {
        this.ctx = game.ctx;
        this.color = color;
        this.size = size;
        this.stars = [];
        this.numOfStars = numOfStars;
        this.minVelocity = 2;
        this.maxVelocity = 100;
        this.fps = 40;

        this.init();
       
    }

    genStar(x, y, size, velocity) {
        return { x, y, size, velocity }
    }

    init() {
        for (let i = 0; i < this.numOfStars; i++) {
            this.stars.push(this.genStar(
                Math.random() * this.size.w,
                Math.random() * this.size.h,
                Math.random() * 3 + 1,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
            )) 
        }
    }

    draw() {
        this.ctx.fillStyle = '#ffffff';
        this.stars.map(star => {
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        })
    }

    update() {
        let dt = 1 / this.fps
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
            star.y += dt * star.velocity;
            if (star.y > this.size.h) {
                this.stars[i] = this.genStar(Math.random() * this.size.w, 0, Math.random() * 3 + 1,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity)
            }
        }  
    }
}