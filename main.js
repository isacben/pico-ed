let canvas;
let drawingZoom = 1;
let drawingColor = 3;
const drawingWidth = 8;
const drawingHeight = 8;

let sprite = [
    9,9,6,0,0,0,0,2,2,0,0,0,0,0,0,0,
    0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    9,9,6,0,0,0,0,2,2,0,0,0,0,0,0,0,
    0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
]

const COLORS = [
    "#000000", "#1D2B53", "#7E2553", "#008751", 
    "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", 
    "#FF004D", "#FFA300", "#FFEC27", "#00E436",
    "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"];

// Add event listeners for zoom controls
document.querySelectorAll('input[name="zoom"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        drawingZoom = parseInt(e.target.value);
        redraw();
    });
});

// Add event listeners for color selection
document.querySelectorAll('.color').forEach((color, index) => {
    color.style.backgroundColor = COLORS[index];
    color.addEventListener('click', (e) => {
        drawingColor = index;
        console.log('Selected color:', COLORS[index], 'at index:', index, 'drawingColor:', drawingColor);
    });
});

function setup() {
    // Use the existing canvas element
    canvas = createCanvas(500, 500, document.getElementById('drawingCanvas'));
    
    // Set canvas styles
    canvas.style('display', 'block');
    
    // Set canvas background to black
    background(0);
}

function draw() {
    // Clear the canvas
    clear();
    background(0);
    
    // Draw the grid
    drawGrid();
    drawPixel();
    drawSprite();
}

function redraw() {
    // Clear and redraw the canvas
    clear();
    background(0);
    drawGrid();
    drawPixel();
    drawSprite();
}

function drawGrid() {
    // Draw grid lines
    stroke(40);
    strokeWeight(1);
    
    // Vertical lines
    for (let x = 0; x < 500; x += 500/drawingWidth/drawingZoom) {
        line(floor(x), 0, floor(x), 500);
    }
    
    // Horizontal lines
    for (let y = 0; y < 500; y += 500/drawingHeight/drawingZoom) {
        line(0, floor(y), 500, floor(y));
    }
}

function drawSprite() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < sprite.length; i++) {
        fill(COLORS[sprite[i]]);
        rect(x*500/drawingWidth/drawingZoom, y*500/drawingHeight/drawingZoom, 500 / drawingWidth / drawingZoom, 500 / drawingHeight / drawingZoom);
        x++;
        if (i % 16 === 15) {
            x = 0;
            y++;
        }
    }
}

function drawPixel() {
    if (mouseIsPressed && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        const cellSize = 500 / drawingWidth / drawingZoom;
        const sprites = 2;
        const cellX = floor(mouseX / cellSize);
        const cellY = floor(mouseY / cellSize);
        const index = cellX + cellY * drawingWidth * sprites;
        
        // Ensure we're within bounds
        if (index >= 0 && index < sprite.length) {
            sprite[index] = drawingColor;
            console.log(`Cell: (${cellX}, ${cellY}), Index: ${index}`);
        }
    }
}

// Handle window resizing
function windowResized() {
    // Maintain the fixed size of 500x500
    resizeCanvas(500, 500);    background(0);
}

