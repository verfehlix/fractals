//setup canvas
let canvas = document.getElementById("fractalCanvas");
let context = canvas.getContext('2d');

//drawing parameters
let start = {
    x: 5,
    y: 250
};
let end = {
    x: 845,
    y: 250
};

koch(start, end);

//draws a line
function drawLine(startPoint, endPoint) {
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
}

//erases a line
function eraseLine(startPoint, endPoint) {
    context.strokeStyle = 'rgba(255,255,255,1)';
    context.lineWidth = 3
    drawLine(startPoint, endPoint);
    context.strokeStyle = 'rgba(0,0,0,1)';
    context.lineWidth = 1
}

//recursive koch curve function
function koch(startPoint, endPoint) {

    //calculate euclidean distance between both points
    let diffX = startPoint.x - endPoint.x
    let diffY = startPoint.y - endPoint.y
    let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))

    //if distance is too small, exit recursion
    if (distance < 1) {
        return;
    }

    //draw a line between both points
    drawLine(startPoint, endPoint)

    //defined left split point on our line
    let left = {
        x: 2 / 3 * startPoint.x + 1 / 3 * endPoint.x,
        y: 2 / 3 * startPoint.y + 1 / 3 * endPoint.y
    }

    //defined right split point on our line
    let right = {
        x: 1 / 3 * startPoint.x + 2 / 3 * endPoint.x,
        y: 1 / 3 * startPoint.y + 2 / 3 * endPoint.y
    }

    //define middle point on our line
    let middle = {
        x: (left.x + right.x) / 2,
        y: (left.y + right.y) / 2
    }

    //create vector from our line
    let vectorX = right.x - left.x
    let vectorY = right.y - left.y

    //calculate perpendicular vector
    let vectorXperpendicular = -(right.y - left.y)
    let vectorYperpendicular = right.x - left.x

    //define top point of triangle via middle point + perpendicular vector
    let top = {
        x: middle.x + (Math.sqrt(3) / 2 * vectorXperpendicular),
        y: middle.y + (Math.sqrt(3) / 2 * vectorYperpendicular)
    };

    //draw lines of triangle & erase bottom line
    drawLine(left, top)
    drawLine(right, top)
    eraseLine(left, right);

    //call koch function on all remaining parts of the line
    koch(startPoint, left)
    koch(left, top)
    koch(top, right)
    koch(right, endPoint)
}