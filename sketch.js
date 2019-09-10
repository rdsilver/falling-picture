let columnsWithPixels = [];
let tempPixels;

function preload() {
  img = loadImage("assets/zuckerberg.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(img.width, img.height);
  canvas.parent('sketch');
  image(img, 0, 0);
  findColumnsWithPixels();
}

function findColumnsWithPixels() {
  loadPixels();
  for(let x=0;x<width;x++) {
    for(let y=height;y>=0;y--) {
      const index = (x+y*width)*4;

      if (columnsWithPixels.indexOf(x) >= 0)
        continue;

      if (pixels[index]) {
        columnsWithPixels.push(x);
      }
    }
  }
}

function draw() {
  dropPixels();
}

function dropPixels() {
  loadPixels();
  tempPixels = new Array(pixels.length).fill(-1);
  for(let i=0;i<columnsWithPixels.length;i++) {
    for(let y=height; y >= 0; y--) {
      let x = columnsWithPixels[i];
      let index = (x+y*width)*4;
      let oneAbove = (x+(y+1)*width)*4;
      if (y+1 < height ) {
        if (!pixels[oneAbove]) {
          let color = [pixels[index], pixels[index+1], pixels[index+2] ,pixels[index+3]]
          setPixel(oneAbove, color);
          setPixel(index, [null, null, null, null]);
        }
      }
    }
  }

  for(let i=0; i<tempPixels.length; i++) {
    if (tempPixels[i] != -1) {
      pixels[i] = tempPixels[i];
    }
  }
  updatePixels();
}

function setPixel(index, color) {
  tempPixels[index] = color[0];
  tempPixels[index+1] = color[1];
  tempPixels[index+2] = color[2];
  tempPixels[index+3] = color[3];
}
