// Const variables 
const debugging = false;

const colors = {
  white: '#ffffff',
  green: '#00ff00'
}

const gameState = {
  lives: 3,
  scene: 'start',
  fps: 50,
  gameWidth: 400,
  gameHeight: 300,
  level: 0,
  frame: 0,
  swingState: 0,
  swingDirection: 1,
  tankpos: 0,
  invaderspeed: 30,
  invadersTop: 50,
  gameSpeed: 5,
  spriteSize: 40,
  beamPresent: false,
  beamPos: { x: 0, y: 0 },
  table: [],
  width: 0,
  height: 0,
  laserBeams: []
}

const Invaders = {
  squid: ['d','e'],
  crab: ['b', 'c'],
  octopus: ['f', 'g'],
}

const Shapes = {
  tank: ['w'],
  tankRuin: ['x'],
  explosion : ['z'],
  ufo: ['h'],
  laser: ['y']
}

class InvaderSquad {
  squad = [];

  constructor(ctx, rows, colNum) {
    this.ctx = ctx;
    this.rows = rows;
    this.colNum = colNum;
    this.squadOffset = {x:0, y:0};
    let gapper = 0;
    
    rows.map(rowType=> {
      let newRow = [];
      gapper += 1;
      for (let i = 0; i < colNum; i++) {
        newRow.push(new Invader(
          this.ctx, 
          {x: ((gameState.width/2)-colNum*gameState.spriteSize/1.5)+(i*gameState.spriteSize*1.5), y: 100+(gapper*gameState.spriteSize*1.5)}, 
          Invaders[rowType], 
          'green', 
          gameState.spriteSize, 
          gameState.invaderspeed
        ))
      }
      this.squad.push(newRow);
    })
  }

  getSquad() {
    return this.squad;
  }

  draw() {
    this.squad.map(rows => {
      rows.map(invader => {
        invader.draw();
        invader.move();
      })
    })
  }
}

// Functions 

const welcomeDraw = (game, ctx) => {
 
  const charmap = 'qwertyuiopasdfghjklzxcvbnm'
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.textBaseline = "center";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillStyle = '#ffffff';
  ctx.fillText("Space Invaders", game.width / 2, game.height / 2 - 40);
  ctx.font = "16px Arial";
  ctx.fillText("Press 'Space' to start.", game.width / 2, game.height / 2);
  const size = 30;
  debugging && charmap.split('').map((char, index) => {
    ctx.font = `${size}px invaders`;
    ctx.fillText(char, 60, size+size*index)
    ctx.font = `${size}px Arial`;
    ctx.fillText(char, 120, size+size*index)

    ctx.font = `${size}px invaders`;
    ctx.fillText(char.toUpperCase(), 180, size+size*index)
    ctx.font = `${size}px Arial`;
    ctx.fillText(char.toUpperCase(), 240, size+size*index)
  })
};

const drawGame = (game, ctx) => {
  ctx.clearRect(0, 0, game.width, game.height); // clear canvas
  gameState.table.draw(); // draw invaders
  gameState.tank.draw(); // draw tank
  gameState.laserBeams.map((laserBeam) => {

    gameState.table.getSquad().map(squad => {
      squad.map(invader => {
        if (invader.active === 1) {
          const invaderPos = invader.getHitBox();
        const beamPos = laserBeam.getHitBox();
        if (
            beamPos.x < invaderPos.x + invaderPos.w &&
            beamPos.x + beamPos.w > invaderPos.x &&
            beamPos.y < invaderPos.y + invaderPos.h &&
            beamPos.y + beamPos.h > invaderPos.y
          ) {
          invader.explode(Shapes.explosion)
          gameState.laserBeams.shift();
        }
        }
        
      })
    })
   
    laserBeam.draw();
    laserBeam.move();
    if (laserBeam.getPosition().y < 0) {
      console.log('laserBeam', laserBeam.getHitBox())
      gameState.laserBeams.shift();
    }
  })
}

const render = () => {
  drawGame(gameState, gameState.ctx)
  requestAnimationFrame(render)
}

const gotoGame = function (game, ctx) {
  ctx.clearRect(0, 0, game.width, game.height);
  gameState.table = new InvaderSquad(ctx, ['squid', 'squid', 'crab', 'crab', 'octopus', 'octopus'].reverse(), 10);
  gameState.tank = new Tank(ctx, {x:gameState.width/2,y:gameState.height-gameState.spriteSize}, Shapes.tank, 'green', gameState.spriteSize+10, 1);
  gameState.ctx = ctx;
  render()

};



(() => {


  const startGame = () => {
    gameState.scene = 'inGame'
    draw(gotoGame)
  }

  const goLeft = () => { if (gameState.tankpos > gameState.spriteSize) { gameState.tankpos -= 10 } }
  const goRight = () => { if (gameState.tankpos < gameState.width - gameState.spriteSize) { gameState.tankpos += 10 } }

  const shootBeam = () => {
    if (!gameState.beamPresent) {
      gameState.beamPos.x = gameState.tankpos
      gameState.beamPos.y = gameState.height
      gameState.beamPresent = true
    }

  }


  const keymap = {
    '32': {
      'start': startGame,
      'inGame': shootBeam
    },
    '37': {
      'inGame': goLeft
    },
    '39': {
      'inGame': goRight
    },

    // debug keys
    '83': {
      'inGame': () => { debugging && console.log('gameState.table.getSquad()', gameState.table.getSquad());}
    }
    
  }

  const sceneMap = {
    'start': welcomeDraw
  }


  let stateStack = []
  pressedKeys = {}
  gameCanvas = null

  const keyDownHandler = (_key) => {
    const pressedKey = _key.keyCode
    if (keymap[pressedKey]) {
      keymap[pressedKey][gameState['scene']]()
    }
  }

  const keyUpHandler = (_key) => {
  }

  const draw = (stateFn = null) => {
    const gameCanvas = document.querySelector("#gameCanvas");
    gameState.width = window.innerWidth - 200
    gameState.height = window.innerHeight - 200
    gameState.tankpos = (window.innerWidth - 200) / 2
    gameCanvas.width = gameState.width
    gameCanvas.height = gameState.height
    if (stateFn) {
      let ctx = gameCanvas.getContext('2d');
      stateFn(gameState, ctx)
    }
  }

  const start = () => {
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)
    window.addEventListener('resize', () => {
      draw(sceneMap[gameState['scene']])
    })
    draw(sceneMap[gameState['scene']])

  }

  start()
})()
