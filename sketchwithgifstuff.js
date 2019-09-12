var img, img2;
var gif;
var fileName = 'melted.webm';
var saved = false;
let columnsWithPixels = [];
let tempPixels;

function preload() {
  img1 = loadImage("assets/clinton.png");
  img2 = loadImage("assets/zuckerberg.png");
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(400, 700);
  canvas.parent('sketch');
  imageMode(CENTER);
  angleMode(DEGREES);
  // push()
  // translate (width/2, height/2);
  // rotate(noise(frameCount) * 100);
  // image(img, 0, 0);
  // pop();
  //findColumnsWithPixels();

  // var bigint = checkColors();
  // gif = new CCapture({
  //   framerate: 60,
  //   quality: 50,
  //   format: 'webm',
  //   name: fileName,
  //   //transparent: bigint,
  //   //transparent: null,
  //   workersPath: 'gifLibrary/'
  // });

  // gif.start();
}

// function findColumnsWithPixels() {
//   loadPixels();
//   for(let x=0;x<width;x++) {
//     for(let y=height-1;y>=0;y--) {
//       const index = (x+y*width)*4;
//
//       if (columnsWithPixels.indexOf(x) >= 0)
//         continue;
//
//       if (pixels[index]) {
//         columnsWithPixels.push(x);
//       }
//     }
//   }
// }

function draw() {
  // if (frameCount<2000 && frameCount%5 == 0) {
  //   gif.capture(canvas.elt);
  // } else if (frameCount == 2000) {
  //   gif.save(doneRendering);
  //   saved = true;
  // }

  // if (frameCount % img.height === 0) {
  //   translate (Math.random()*width, img.height/2);
  //   rotate(frameCount*100*Math.random());
  //   image(img, 0, 0);
  // }

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
  var randomPics = [img1, img2];
  push()
  translate(mouseX, mouseY);
  rotate(Math.random() * 5000);
  scale(.75);
  image(img1, 0, 0);
  pop();
}

function doneRendering(blob) {
  saveGif(blob);
}

function saveGif(blob) {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();

  if (/Edge\/\d./i.test(navigator.userAgent))
    navigator.msSaveOrOpenBlob(blob, fileName);

  window.URL.revokeObjectURL(url);
};

/* Finds a color NOT present on canvas
 * For picking a background for transparency */
function checkColors() {
  let colors = {}

  _canvas = document.createElement('canvas')
  _canvas.width = canvas.width
  _canvas.height = canvas.height

  let ctx = _canvas.getContext('2d')
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(canvas.elt, 0, 0)
  let imgdata = ctx.getImageData(0,0,canvas.width,canvas.height).data;

  // Convert "imgdata" to rgb int
  for (let i = 0, n = imgdata.length; i < n; i += 4) {
    let integer = ( (imgdata[i] << 16) + (imgdata[i+1] << 8) + imgdata[i+2])
    colors[integer] = true;
  }

  for (let i = 0; i < 0xFFFFFF; i += 0x000001) {
    if (!colors[i]) {
      return i;
    }
  }
}
