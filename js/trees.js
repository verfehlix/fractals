// setup canvas
const canvas = document.getElementById("fractalCanvas")
const context = canvas.getContext('2d')

// draws a line
function drawLine(startPoint, endPoint) {
    context.beginPath()
    context.moveTo(startPoint.x, startPoint.y)
    context.lineTo(endPoint.x, endPoint.y)
    context.stroke()
}

// converts a degree angle to radians
function degToRad(angleDeg) {
    return angleDeg * (Math.PI / 180)
}

// draws a tree (recursively)
function drawTree(startPoint, endPoint, angleDeg) {

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
        x: endPoint.x + newLength * Math.cos((existingAngle - degToRad(angleDeg))),
        y: endPoint.y + newLength * Math.sin((existingAngle - degToRad(angleDeg)))
    }

    const pointLeft = {
        x: endPoint.x + newLength * Math.cos((existingAngle + degToRad(angleDeg))),
        y: endPoint.y + newLength * Math.sin((existingAngle + degToRad(angleDeg)))
    }

    drawTree(endPoint, pointRight, angleDeg)
    drawTree(endPoint, pointLeft, angleDeg)


}

//start the recursion
drawTree({x: 400, y: 700}, {x: 400, y: 550}, 30)