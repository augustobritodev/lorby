const clientSocket = io()

const canvas = document.getElementById('canvas')
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary')
const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--secondary')
  const backgroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--background')
  const foregroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--foreground')

const context = canvas.getContext('2d')

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const TILE_SIZE = 64
const PLAYER_SIZE = 32

canvas.width = WIDTH
canvas.height = HEIGHT 

let lastTimestamp = 0
let clientMap = []
let clientPlayers = []

clientSocket.on('setup', (map) => {
  clientMap = map
})

clientSocket.on('players', (players) => {
  clientPlayers = players
})

function update(delta) {

}

function draw() {
  context.clearRect(0, 0, WIDTH, HEIGHT)
  
    context.fillStyle = foregroundColor
    for (let row = 0; row < clientMap.length; row++) {
      for (let col = 0; col < clientMap[row].length; col++) {
        const tile = clientMap[row][col]

        if (tile === 1) {
          context.fillRect(
            col * TILE_SIZE,
            row * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
          )
        }
      }
    }

    for (let player of clientPlayers) {
      context.fillStyle = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)]
      context.fillRect(
        player.position.x,
        player.position.y,
        PLAYER_SIZE,
        PLAYER_SIZE
      )
    }
}

function loop(timestamp) {
  const delta = timestamp - lastTimestamp

  update(delta)
  draw()

  lastTimestamp = timestamp
  window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
