starfield = () => {
  let stars = []
  const opts = {
    fps: 40,
    minVelocity: 2,
    maxVelocity: 100,
    canvas: null,
    strs: 100,
    intervalId: 0,
    width: 0,
    height: 0
  }

  const genStar = (x, y, size, velocity) => {
    return { x, y, size, velocity }
  }

  const draw = () => {
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }

  }

  const init = (div) => {
    width = window.innerWidth
    height = window.innerHeight

    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      draw()
      update()

    })

    let cnvs = document.createElement('canvas');
    div.appendChild(cnvs)
    canvas = cnvs
    canvas.width = width
    canvas.height = height
    draw()
  }

  const start = () => {
    for (let i = 0; i < opts.strs; i++) {
      stars.push(genStar(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 3 + 1,
        (Math.random() * (opts.maxVelocity - opts.minVelocity)) + opts.minVelocity
      ))
    }

    intervalId = setInterval(() => {
      update()
      draw()
    }, 1000 / opts.fps)
  }

  const update = () => {
    let dt = 1 / opts.fps
    for (let i = 0; i < stars.length; i++) {
      var star = stars[i];
      star.y += dt * star.velocity;
      if (star.y > height) {
        stars[i] = genStar(
          Math.random() * width,
          0,
          Math.random() * 3 + 1,
          (Math.random() * (opts.maxVelocity - opts.minVelocity)) + opts.minVelocity)
      }
    }
  }

  init(document.querySelector('#container'))
  start()
}

starfield()
