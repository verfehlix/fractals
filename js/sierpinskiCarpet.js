// setup canvas
const canvas = document.getElementById("fractalCanvas")
const context = canvas.getContext('2d')

// drawing parameters
const canvasSize = canvas.width
const colorful = true

// draws a rectangle
function drawRect(x, y, size) {
    if(colorful) {
        context.fillStyle = getVeryColoredColorString(x, y)
    }
    context.fillRect(x, y, size, size)
}

// returns a "random" color in string format
function getVeryColoredColorString(x, y) {
    const r = Math.floor((x + y) / 1500 * 255) + 1
    const g = 0
    const b = Math.floor((1500 - (x + y))/ 1500 * 255) + 1

    return "rgb(" + r + "," + g + "," + b + ")"
}


// recursive sierpinski sierpinskiCarpet function
function sierpinskiCarpet(x, y, size) {
    setTimeout(function(){

        // exit condition: rect is smaller than 1 (not visible anyway)
        if (size >= 1) {

            drawRect(x, y, size, size)

            const newSize = size / 3

            const xLeft = x - 2 * newSize
            const xMid = x + newSize
            const xRight = x + size + newSize

            const yTop = y - 2 * newSize
            const yMid = y + newSize
            const yBottom = y + size + newSize

            sierpinskiCarpet(xLeft, yTop, newSize)
            sierpinskiCarpet(xMid, yTop, newSize)
            sierpinskiCarpet(xRight, yTop, newSize)

            sierpinskiCarpet(xLeft, yMid, newSize)
            sierpinskiCarpet(xRight, yMid, newSize)

            sierpinskiCarpet(xLeft, yBottom, newSize)
            sierpinskiCarpet(xMid, yBottom, newSize)
            sierpinskiCarpet(xRight, yBottom, newSize)

       }
    },500)
}

const initialSize = canvasSize / 3

const initialXY = canvasSize / 2 - initialSize/2

if(colorful) {
    context.fillStyle = "black"
    context.fillRect(0, 0, canvasSize, canvasSize)
}

sierpinskiCarpet(initialXY, initialXY, initialSize)
