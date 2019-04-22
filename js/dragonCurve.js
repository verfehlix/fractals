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

// calculates euclidean distance between two points
function euclideanDistance(p1, p2) {
    const diffX = p1.x - p2.x
    const diffY = p1.y - p2.y
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
}

function tri45getSideLengthFromBaseLine(baseLine) {
    const baseLineLength = euclideanDistance(baseLine[0], baseLine[1])
    return (baseLineLength * Math.sqrt(2)) / 2
}

function tri45getHeight(a, b, c) {
    return (a * b) / c
}

function getNormalizedVectorFromLine(line) {
    const x = line[0].x - line[1].x
    const y = line[0].y - line[1].y
    const vectorLength = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    return {
        x: x / vectorLength,
        y: y / vectorLength,
    }
}

function getOrthogonalVectorClockWise(vector) {
    return {
        x: vector.y,
        y: -vector.x,
    }
}

function getOrthogonalVectorCounterClockWise(vector) {
    return {
        x: -vector.y,
        y: vector.x,
    }
}

function drawAllLines(lines) {
    lines.forEach(line => {
        drawLine(line[0], line[1])
    })
}

function dragonCurve(line, switchDirection, depth) {
    const childLineLength = tri45getSideLengthFromBaseLine(line)
    const startPointLine1 = line[0]
    const endPointLine2 = line[1]

    const height = tri45getHeight(
        childLineLength,
        childLineLength,
        euclideanDistance(line[0], line[1])
    )

    const middlePointBaseLine = {
        x: (line[0].x + line[1].x) / 2,
        y: (line[0].y + line[1].y) / 2,
    }

    const baseVector = getNormalizedVectorFromLine(line)
    const orth1 = getOrthogonalVectorClockWise(baseVector)
    const orth2 = getOrthogonalVectorCounterClockWise(baseVector)

    const orth = switchDirection ? orth1 : orth2

    const childLineCrossPoint = {
        x: middlePointBaseLine.x + orth.x * height,
        y: middlePointBaseLine.y + orth.y * height,
    }
    const child1 = [startPointLine1, childLineCrossPoint]
    const child2 = [childLineCrossPoint, endPointLine2]

    if (depth === MAX_DEPTH) {
        return [child1, child2]
    } else {
        return [
            ...dragonCurve(child1, true, depth + 1),
            ...dragonCurve(child2, false, depth + 1),
        ]
    }
}

const initialLine = [{ x: 200, y: 400 }, { x: 750, y: 400 }]
let MAX_DEPTH = 1
let direction = 1

const drawInterval = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (MAX_DEPTH === 15 || MAX_DEPTH === 0) {
        direction = -direction
    }

    const dragonLines = dragonCurve(initialLine, true, 0)
    drawAllLines(dragonLines)

    MAX_DEPTH += direction
}, 1000)
