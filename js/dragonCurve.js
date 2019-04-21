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

// TODO: rotation immer abwechselnd!

function calculateAngledChildLines(line, i) {
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

    const childLineCrossPoint = {
        x: middlePointBaseLine.x + orth1.x * height,
        y: middlePointBaseLine.y + orth1.y * height,
    }

    return [
        [startPointLine1, childLineCrossPoint],
        [childLineCrossPoint, endPointLine2],
    ]
}

let i = 0
const MAX_I = 2

const initialLines = [[{ x: 200, y: 425 }, { x: 600, y: 425 }]]

function dragonCurve(lineList) {
    if (i === MAX_I) {
        return
    }

    lineList.forEach(line => {
        drawLine(line[0], line[1])
        const childs = calculateAngledChildLines(line, i)
        dragonCurve(childs)
    })
    i++
}

dragonCurve(initialLines)
