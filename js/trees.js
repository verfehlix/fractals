// setup canvas
const canvas = document.getElementById("fractalCanvas")
const context = canvas.getContext('2d')

// init vars
const angleRad = 0.523599 // 30 deg

// draws a line
function drawLine(startPoint, endPoint) {
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(endPoint.x, endPoint.y)
    context.stroke()
}

// draws a tree (recursively)
function drawTree(startPoint, endPoint) {

    // exit condition for recursion
    const diffX = startPoint.x - endPoint.x
    const diffY = startPoint.y - endPoint.y
    const lineLength = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))

    if(lineLength<1) {
        return
    }

    // draw line between the two points
    drawLine(startPoint, endPoint)

    // calculate length of next lines
    const newLength = lineLength * 2/3

    // calculate angle between the two points
    const existingAngle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x)

    // calculate new end points
    const pointRight = {
        x: endPoint.x + newLength * Math.cos((existingAngle - angleRad)),
        y: endPoint.y + newLength * Math.sin((existingAngle - angleRad))
    }

    const pointLeft = {
        x: endPoint.x + newLength * Math.cos((existingAngle + angleRad)),
        y: endPoint.y + newLength * Math.sin((existingAngle + angleRad))
    }

    drawTree(endPoint, pointRight)
    drawTree(endPoint, pointLeft)


}

drawTree({x: 400, y: 700}, {x: 400, y: 550})