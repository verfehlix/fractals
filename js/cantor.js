// setup canvas
const canvas = document.getElementById("fractalCanvas")
const context = canvas.getContext('2d')

// drawing parameters
const startX = 50
const startY = 50
const initialLineLength = 750
const steppingDistanceY = 50
const drawType = "rect" // can be "rect" or "line"

// start recursive cantor function
cantor(startX, startY, initialLineLength)

// draws a horizintal line
function drawHorizontalLine(x, y, length) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x + length, y)
    context.stroke()
}

// draws a rectangle
function drawRect(x, y, width, height) {
    context.fillRect(x, y, width, height)
}

// recursive cantor function
function cantor(x, y, length) {
    // exit condition: line length is smaller than 1 (not visible anyway)
    if (length >= 1) {
        // draw either rect or line at coordinates
        if (drawType === "rect")
            drawRect(x, y, length, Math.sqrt(length))
        else
            drawHorizontalLine(x, y, length)

        // step to next layer
        y += steppingDistanceY

        // padding between lines on one layer is min. 1
        const padding = Math.max(1, length / 50)

        // "left" side --> draw line with half length - padding
        cantor(x, y, length / 2 - padding)

        // "right" side --> draw line with half length - padding
        cantor(x + length * 1 / 2 + padding, y, length / 2 - padding)
    }
}