let img;

function preload() {
  img = loadImage("assets/clinton.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(500, 800);
  canvas.parent('sketch');
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  loadPixels();
  dropPixels();
  dropPixels();
  dropPixels();
  dropPixels();
  updatePixels();
}

function dropPixels() {
  for(let x=0;x<width;x++) {
    for(let y=height-1;y>=0;y--) {
      let index = (x+y*width)*4;
      let indexBelow = (x+(y+1)*width)*4;

      if (y+1 < height ) {
        if (pixels[indexBelow] < pixels[index]) {
          swapPixels(indexBelow, index);
        }
      }
    }
  }
}

function swapPixels(firstPixelIndex, secondPixelIndex) {
  let firstPixelColor = [pixels[firstPixelIndex], pixels[firstPixelIndex+1], pixels[firstPixelIndex+2], pixels[firstPixelIndex+3]];
  let secondPixelColor = [pixels[secondPixelIndex], pixels[secondPixelIndex+1], pixels[secondPixelIndex+2] ,pixels[secondPixelIndex+3]];
  setPixel(firstPixelIndex, secondPixelColor);
  setPixel(secondPixelIndex, firstPixelColor);
}


function setPixel(index, color) {
  pixels[index] = color[0];
  pixels[index+1] = color[1];
  pixels[index+2] = color[2];
  pixels[index+3] = color[3];
}


function mouseClicked() {
  $('.frame').removeClass('noClick');
  push()
  translate(mouseX, mouseY);
  rotate(Math.random() * 5000);
  scale(.75);
  image(img, 0, 0);
  pop();
}
