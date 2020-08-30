// Const variables 
const debugging = false;

const colors = {
  white: '#ffffff',
  green: '#00ff00',
}

const gameState = {
  lives: 3,
  scene: 'start',
  fps: 50,
  level: 0,
  invaderspeed: 30,
  invadersTop: 50,
  gameSpeed: 5,
  spriteSize: 40,
  beamPresent: false,
  beamPos: { x: 0, y: 0 },
  table: [],
  width: 0,
  height: 0,
  laserBeams: [],
  ctx: null,
  score: 0,
  invadersNum: 0
}

const initialGameState = Object.assign(gameState);

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

  constructor(game, rows, colNum) {
    this.ctx = game.ctx;
    this.rows = rows;
    this.colNum = colNum;
    this.squadOffset = {x:0, y:0};
    let gapper = 0;
    
    rows.map(rowType=> {
      let newRow = [];
      gapper += 1;
      for (let i = 0; i < colNum; i++) {
        newRow.push(new Invader(
          game, 
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
  ctx.font = "100px arcade";
  ctx.fillStyle = '#ffffff';
  ctx.fillText("Space Invaders", game.width / 2, game.height / 2 - 40);
  ctx.font = "30px arcade";
  ctx.fillText("Press [Space] to  start.", game.width / 2, game.height / 2);
  const size = 30;
  debugging && charmap.split('').map((char, index) => {
    ctx.font = `${size}px invaders`;
    ctx.fillText(char, 60, size+size*index)
    ctx.font = `${size}px arcade`;
    ctx.fillText(char, 120, size+size*index)

    ctx.font = `${size}px invaders`;
    ctx.fillText(char.toUpperCase(), 180, size+size*index)
    ctx.font = `${size}px arcade`;
    ctx.fillText(char.toUpperCase(), 240, size+size*index)
  })
};


const drawScore = (game, ctx) => {
  ctx.font = "50px arcade";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`score: `, 100, 50);
  ctx.fillStyle = '#00ff00';
  ctx.fillText(`${game.score}`, 100 + 'score'.split('').length *40, 50)
}

const drawGame = (game, ctx) => {
  ctx.clearRect(0, 0, game.width, game.height); // clear canvas

  drawScore(game, ctx);
  
  gameState.starField.draw();
  gameState.starField.update();

  gameState.table.draw(); // draw invaders
  gameState.tank.draw(); // draw tank
  gameState.laserBeams.map((laserBeam) => {
    gameState.table.getSquad().map(squad => {
      squad.map(invader => {
        if (invader.active === 1) {
          finished = false;
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
            game.invadersNum -= 1;
            if (game.invadersNum <= 0) {
              alert('you won!')
              setTimeout(()=> {
                window.location.reload();
              },100)
            }
        }
        }
        
      })
    })
   
    laserBeam.draw();
    laserBeam.move();
    if (laserBeam.getPosition().y < 0) {
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
  gameState.ctx = ctx;
  gameState.table = new InvaderSquad(game, ['crab', 'crab', 'crab', 'crab', 'crab', 'crab'].reverse(), 10);
  gameState.invadersNum = gameState.table.getSquad().flat().length;
  console.log('gameState', gameState)
  gameState.tank = new Tank(game, {x:gameState.width/2,y:gameState.height-gameState.spriteSize}, Shapes.tank, 'green', gameState.spriteSize+10, 1);
  gameState.starField = new StarField(game, '#ffffff', {w: window.innerWidth, h: window.innerHeight}, 100)
  
  render()

};



(() => {


  const startGame = () => {
    gameState.scene = 'inGame'
    draw(gotoGame)
  }

  const keymap = {
    '32': {
      'start': startGame,
    }    
  }

  const sceneMap = {
    'start': welcomeDraw
  }

  const keyDownHandler = (_key) => {
    const pressedKey = _key.keyCode
    if (keymap[pressedKey] && keymap[pressedKey][gameState['scene']]) {
      keymap[pressedKey][gameState['scene']]()
    }
  }

  const draw = (stateFn = null) => {
    const gameCanvas = document.querySelector("#gameCanvas");
    gameState.width = window.innerWidth - 200
    gameState.height = window.innerHeight - 200
    gameCanvas.width = gameState.width
    gameCanvas.height = gameState.height
    if (stateFn) {
      let ctx = gameCanvas.getContext('2d');
      stateFn(gameState, ctx)
    }
  }

  const start = () => {
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('resize', () => {
      draw(sceneMap[gameState['scene']])
    })
    draw(sceneMap[gameState['scene']])

  }

  start()
})()
