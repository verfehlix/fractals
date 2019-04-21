// setup canvas
const canvas = document.getElementById('fractalCanvas')
const context = canvas.getContext('2d')

// draws a square
function drawSquare(startPoint, size, color) {
    context.fillStyle = color
    context.fillRect(startPoint.x, startPoint.y, size, size)
}

// draws a grid onto the canvas
function drawGrid(gridData) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    const canvasSize = canvas.height
    const gridSize = gridData[0].length
    const rectSize = canvasSize / gridSize

    for (let gridY = 0; gridY < gridSize; gridY++) {
        for (let gridX = 0; gridX < gridSize; gridX++) {
            const rectY = gridY * rectSize
            const rectX = gridX * rectSize
            const color = gridData[gridY][gridX] === 1 ? 'black' : 'white'
            drawSquare({ x: rectX, y: rectY }, rectSize, color)
        }
    }
}

// haferman transformation of a data grid
function hafermanTransform(array) {
    let rerturnArray = []

    //determine size of subArrays
    let subArray = array[0]
    let subArraySize = subArray.length

    //calculate size of new subArrays
    const newSubArraySize = subArraySize * 3

    //fill returnArray with "empty" subarrays
    for (let i = 0; i < newSubArraySize; i++) {
        let subArray = []

        for (let i = 1; i <= newSubArraySize; i++) {
            // subArray.push(i)
            subArray.push('-')
        }

        rerturnArray.push(subArray)
    }

    for (let y = 0; y < subArraySize; y++) {
        for (let x = 0; x < subArraySize; x++) {
            const element = array[y][x]
            const newX = x * 3
            const newY = y * 3

            if (element === 1) {
                // top row
                rerturnArray[newY][newX] = 0
                rerturnArray[newY][newX + 1] = 1
                rerturnArray[newY][newX + 2] = 0

                // middle row
                rerturnArray[newY + 1][newX] = 1
                rerturnArray[newY + 1][newX + 1] = 0
                rerturnArray[newY + 1][newX + 2] = 1

                // bottom row
                rerturnArray[newY + 2][newX] = 0
                rerturnArray[newY + 2][newX + 1] = 1
                rerturnArray[newY + 2][newX + 2] = 0
            } else if (element === 0) {
                // top row
                rerturnArray[newY][newX] = 1
                rerturnArray[newY][newX + 1] = 1
                rerturnArray[newY][newX + 2] = 1

                // middle row
                rerturnArray[newY + 1][newX] = 1
                rerturnArray[newY + 1][newX + 1] = 1
                rerturnArray[newY + 1][newX + 2] = 1

                // bottom row
                rerturnArray[newY + 2][newX] = 1
                rerturnArray[newY + 2][newX + 1] = 1
                rerturnArray[newY + 2][newX + 2] = 1
            }
        }
    }

    return rerturnArray
}

// pre-compute grids
let grids = [[[1]]]
for (let i = 0; i < 7; i++) {
    grids.push(hafermanTransform(grids[i]))
}

// "animate drawing of carpet"
const max = 7
let iterator = 0

const drawInterval = setInterval(function() {
    drawGrid(grids[iterator])

    iterator++

    if (iterator === max) {
        clearInterval(drawInterval)
    }
}, 2000)
