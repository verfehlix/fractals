// setup canvas
const canvas = document.getElementById('fractalCanvas')
const context = canvas.getContext('2d')

// draws a line
function drawLine(startPoint, endPoint) {
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(endPoint.x, endPoint.y)
    context.stroke()
}

// erases a line
function eraseLine(startPoint, endPoint) {
    context.strokeStyle = 'rgba(255,255,255,1)'
    context.lineWidth = 3
    drawLine(startPoint, endPoint)
    context.strokeStyle = 'rgba(0,0,0,1)'
    context.lineWidth = 1
}

function formula(lastZn, C) {
    return Math.pow(lastZn, 2) + C
}

// c ist eine komplexe zahl (realteil = X-Koordinate, Imaginärteil = Y-Koordinate)
const C = 1

const MAX_ITER = 20
let z = 0

for (let i = 0; i <= MAX_ITER; i++) {
    console.log('z' + i + ': ' + z)
    z = formula(z, C)
    if (z > 2) {
        break
    }
}

// wenn z nach 20 iterationen kleiner als 2 ist, liegt es
// in der menge -> pixel schwarz. wenn nicht, dann nicht --> pixel weiß
