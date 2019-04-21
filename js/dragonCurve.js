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

function euclideanDistance(p1, p2) {
    // calculate euclidean distance between both points
    const diffX = p1.x - p2.x
    const diffY = p1.y - p2.y
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
}

drawLine({ x: 750, y: 250 }, { x: 100, y: 250 })
drawLine({ x: 100, y: 250 }, { x: 400, y: 750 })
drawLine({ x: 400, y: 750 }, { x: 750, y: 250 })
