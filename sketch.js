// Adapted from The Coding Train
// vid: Coding Challenge 166: ASCII Text Images
// src: https://www.youtube.com/watch?v=55iwMYv8tGI

// Global variables
let density = "N@W$9876543210?!abc;:+=-,._ ";
const len = density.length;

let vid; // Video capture device to be defined in setup
let asciiDiv; // HTML Div to be defined in setup

function setup() {
    // Use asciiDiv as our canvas since we have no canvas rn
    noCanvas();
    asciiDiv = createDiv();

    // Create a video capture
    vid = createCapture(VIDEO);
    vid.size(48, 48);
}

function draw() {
    vid.loadPixels();
    let asciiImage = "";

    // Goes through each row in the current frame's pixels
    for(let row = 0; row < vid.width; row++){
    for(let col = 0; col < vid.height; col++){
        // Extract the color information for the pixel at (row, col)
        const pixelIndex = (col + row * vid.width) * 4;
        const r = vid.pixels[pixelIndex];
        const g = vid.pixels[pixelIndex + 1];
        const b = vid.pixels[pixelIndex + 2];
        
        // "brightness" of our pixel
        const avg = (r + g + b) / 3;
        
        // Extract the character from charIndex
        const charIndex = floor(map(avg, 0, 255, 0, len - 1));
        const c = density.charAt(charIndex);
        
        // Replace spaces with the non-breaking space HTML entity
        // https://mailtrap.io/blog/nbsp/#What-does-nbsp-mean
        if(c == " "){
        asciiImage += "&nbsp;"
        } else {
        asciiImage += c;
        }
    }
    // Go to the next line using a HTML line break
    asciiImage += '<br/>';
    }

    // Add the string to our asciiDiv
    asciiDiv.html(asciiImage);
}