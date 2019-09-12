let img;

function preload() {
  img = loadImage("assets/clinton.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(400, 700);
  canvas.parent('sketch');
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  dropPixels();
}

function dropPixels() {
  loadPixels();
  for(let x=0;x<width;x++) {
    for(let y=height-1;y>=0;y--) {
      let index = (x+y*width)*4;
      let indexBelow = (x+(y+1)*width)*4;
      if (y+1 < height ) {
        if (!pixels[indexBelow+3]) {
          let indexColor = [pixels[index], pixels[index+1], pixels[index+2] ,pixels[index+3]]
          let indexBelowColor = [pixels[indexBelow], pixels[indexBelow+1], pixels[indexBelow+2] ,pixels[indexBelow+3]]
          setPixel(indexBelow, indexColor);
          setPixel(index, indexBelowColor);
        }
      }
    }
  }
  updatePixels();
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
