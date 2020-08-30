class Sprite {
    constructor(game, position, shape, color, size, speed) {
      this.ctx = game.ctx;
      this.position = position;
      this.shape = shape;
      this.color = color;
      this.size = size;
      this.shapeIdx = 0;
      this.speed = speed;
      this.speedCounter = 0;
      this.steps = 0;
      this.directionX = 1;
      this.active = 1;
    }
  
    setPosition(position) {
      this.position = position
    }
  
    getPosition() {
      return this.position
    }
  
    getActualShape() {
      let shapeIdx = this.shapeIdx;
      if (this.shape.length === 1) {
        return this.shape[0]
      }
  
      if (this.speedCounter === this.speed){
        this.shapeIdx = shapeIdx === 1 ? 0 : 1;
      }
     
      return this.shape[this.shapeIdx];
    }

    getHitBox() {
      const posX = this.position.x;
      const posY = this.position.y-(this.size-this.size/3);
      const w = this.size-this.size/4;
      const h = this.size-this.size/5;

      if (debugging) {
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, w, h);
        this.ctx.stroke();
      }
      return {x: posX, y: posY, w, h}
    }
  
    draw() {
      if (this.speedCounter <= this.speed){ this.speedCounter += 1; } else {
        this.speedCounter = 0
      }
  
      this.ctx.font = `${this.size}px invaders`;
      this.ctx.fillStyle = colors[this.color];
      this.ctx.fillText(this.getActualShape(), this.position.x, this.position.y)
  
      // draw hitbox around sprites
      this.getHitBox()
    }
  
    move() {
      //  implement it
    }
  }


  class Invader extends Sprite {
    constructor(game, position, shape, color, size, speed){
      super(game, position, shape, color, size, speed)
      this.game = game
    }

    getHitBox() {
      const posX = this.position.x;
      const posY = this.position.y - this.size;
      const w = this.size;
      const h = this.size;

      if (debugging) {
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, w, h);
        this.ctx.stroke();
      }
      return {x: posX, y: posY, w, h}
    }

  
    move() {
      if (this.speedCounter === this.speed) {
        if (this.steps > 10) {
          
          this.directionX = -1;
          
        }
        if (this.steps < 0) {
          this.directionX = +1;
          
        }
        this.steps += this.directionX;
  
        if (this.steps < 11 && this.steps > -1){
          this.position.x += this.directionX*this.size/2;
        }
       
  
        if (this.steps === 11 || this.steps === -1) {
          this.position.y += this.size/2;
        }
        
      }
    }

    explode(anim) {
      this.shape = anim;
      this.active = 0;
      this.game.score += 100
      setTimeout(() => {this.shape = [" "]}, 200)
    }
  }
  

  class LaserBeam extends Sprite {
    constructor(game, position, shape, color, size, speed){
      super(game, position, shape, color, size, speed)
    }

    getHitBox() {
      const posX = this.position.x+ this.size/8;
      const posY = this.position.y-(this.size- this.size /3);
      const w = this.size/8;
      const h = this.size/2;

      if (debugging) {
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, w, h);
        this.ctx.stroke();
      }
      return {x: posX, y: posY, w, h}
    }

    move() {
      if (this.speedCounter === this.speed){
        this.position.y -= 10;
      }
      
    }


  }
  
  class Tank extends Sprite {
    constructor(game, position, shape, color, size, speed){
      super(game, position, shape, color, size, speed)
      window.addEventListener('keydown', this.move.bind(this))
      this.reloadTime = 1000;
      this.ammoOn = true;
      this.game = game;
    }



    shoot(){
      this.ammoOn = false;
      const beam = new LaserBeam(this.game, {x:this.position.x+this.size/5, y: this.position.y}, Shapes.laser, 'green', this.size, 1);
      setTimeout(()=> this.ammoOn = true, this.reloadTime )
      return beam;
    }

    move(event){
      if (event.keyCode === 37) { (this.position.x > this.size) && (this.position.x -= 10);}
      if (event.keyCode === 39) { (this.position.x < this.game.width - this.size) && (this.position.x += 10);}
      if (event.keyCode === 32) {
        if (this.ammoOn) {this.game.laserBeams.push(this.shoot())}
      }
    }
  }