// https://kylemcdonald.github.io/cv-examples/
// hello mel

var capture;
var previousPixels;
var flow;
var w = 660,
    h = 520;
var step = 8;

var okeefeBg;
var startTime;

let fr = 12;

var uMotionGraph, vMotionGraph;


function setup() {

    let fs = fullscreen();
    fullscreen(!fs);
  
    w = displayWidth;
    h = displayHeight;
  
    createCanvas(w,h);
    frameRate(fr);
    
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.hide();
    flow = new FlowCalculator(step);
    
    okeefeBg = loadImage("okeefeBg.jpg");
    startTime = window.performance.now();
    //uMotionGraph = new Graph(100, -step / 2, +step / 2);
    //vMotionGraph = new Graph(100, -step / 2, +step / 2);
}

function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) dst = new src.constructor(n);
    while (n--) dst[n] = src[n];
    return dst;
}

function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}

function draw() {
    fullscreen();
    if (window.performance.now()-startTime<2500) {
      
      image_width = min(w, h*okeefeBg.width / okeefeBg.height);
      image_height = min(h, w*okeefeBg.height / okeefeBg.width);
      
      image(okeefeBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
      
      return;
    }
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    if (previousPixels) {
      // cheap way to ignore duplicate frames
      if (same(previousPixels, capture.pixels, 4, w)) {
        return;
      }

      flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
    }

    previousPixels = copyImage(capture.pixels, previousPixels);

    fill(255, 0, 0, 50);

    if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      
       flow.flow.zones.forEach(function(zone) {
         baseIndex = 4 * (w * zone.y + zone.x);
         r = capture.pixels[baseIndex];
         g = capture.pixels[baseIndex+1];
         b = capture.pixels[baseIndex+2];
         a = 200;
         //stroke(max(0, r-100), max(0, g-100), max(0, b-100));
         stroke(r+random(-100+200), g+random(-50,50), b+random(-20,50), 90);
         strokeWeight(random(3,18));
         //stroke(map(zone.u, -step, +step, 0, 255),
         //    map(zone.v, -step, +step, 0, 255), 128);
         if (zone.u > step/1.1 || zone.u < -step/1.1 || zone.v > step/1.1 || zone.v < -step/1.1) {
           curve(random(0,zone.x), w/1.2, w/2, zone.y, zone.x+random(-2*step,2*step), random(0, zone.y), (zone.x < w/2) ? 0 : w, 0);
         }
         else if(random(0,5)<1){
         strokeWeight(random(12,28));
         stroke(r+200, g+180, b+195, 240);
         curve(zone.x+random(0,step), zone.y, zone.x+random(0,step*10), zone.y+random(0,step), zone.x+random(0,step), zone.y+random(0,step*13), zone.x + step*10, zone.y + step*10);
         }
       })
    }

    }
}