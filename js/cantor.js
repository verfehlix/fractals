//setup canvas
let canvas = document.getElementById("fractalCanvas");
let context = canvas.getContext('2d');

//drawing parameters
let startX = 50;
let startY = 50;
let initialLineLength = 750;
let steppingDistanceY = 50;
let drawType = "rect"; // can be "rect" or "line"

//start recursive cantor function
cantor(startX, startY, initialLineLength);

//draws a horizintal line
function drawHorizontalLine(x, y, length) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + length, y);
    context.stroke();
}

//draws a rectangle
function drawRect(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

//recursive cantor function
function cantor(x, y, length) {
    //exit condition: line length is smaller than 1 (not visible anyway)
    if (length >= 1) {
        //draw either rect or line at coordinates
        if (drawType === "rect")
            drawRect(x, y, length, Math.sqrt(length))
        else
            drawHorizontalLine(x, y, length);

        //step to next layer
        y += steppingDistanceY;

        //padding between lines on one layer is min. 1
        let padding = Math.max(1, length / 50);

        //"left" side --> draw line with half length - padding
        cantor(x, y, length / 2 - padding);

        //"right" side --> draw line with half length - padding
        cantor(x + length * 1 / 2 + padding, y, length / 2 - padding);
    }
}