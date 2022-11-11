// Adapted from The Coding Train
// vid: Coding Challenge 166: ASCII Text Images
// src: https://www.youtube.com/watch?v=55iwMYv8tGI

// Global variables
let density = "N@W$9876543210?!abc;:+=-,._ ";
const len = density.length;

let media; // Video capture device or image to be defined in setup
let asciiDiv; // HTML Div to be defined in setup
let showPic = false;

function preload() {
  // For loading images
  // Original image: https://www.google.com/search?q=dog&tbm=isch&hl=en&tbs=ic:trans%2Cisz:i&rlz=1C1EJFA_enUS1031US1031&sa=X&ved=0CAMQpwVqFwoTCLj69bTgnPsCFQAAAAAdAAAAABAH&biw=1903&bih=969#imgrc=YMNZPsFwjJB1HM
  if(showPic){
    media = loadImage("spongebob.png");
  }
}

function setup() {
  // Use asciiDiv as our canvas since we have no canvas rn
  noCanvas();
  asciiDiv = createDiv();
  
  // Create a video capture
  if(!showPic){
    media = createCapture(VIDEO);
    media.size(256, 256);
  }
}

function draw() {
  media.loadPixels();
  let asciiImage = "";
  
  // Goes through each row in the current frame's pixels
  for(let row = 0; row < media.width; row++){
    for(let col = 0; col < media.height; col++){
      // Extract the color information for the pixel at (row, col)
      const pixelIndex = (col + row * media.width) * 4;
      const r = media.pixels[pixelIndex];
      const g = media.pixels[pixelIndex + 1];
      const b = media.pixels[pixelIndex + 2];
      
      // "brightness" of our pixel
      const avg = (r + g + b) / 3;
      
      // Extract the character from charIndex
      const charIndex = floor(map(avg, 0, 255, len - 1, 0));
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
