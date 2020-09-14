// https://kylemcdonald.github.io/cv-examples/
// hello mel

var capture;
var previousPixels;
var flow;
var w = 700,
    h = 864;
var step2 = 8;

var munchBg;
var startTime;

//let fr = 10;

var uMotionGraph, vMotionGraph;

function setup() {
    let fs = fullscreen();
    fullscreen(!fs);
  
    w = displayWidth;
    h = displayHeight;
  
    createCanvas(w, h);
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
    flow = new FlowCalculator(step2);
    
    munchBg = loadImage("munchBg.jpg");
    startTime = window.performance.now();
    
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
    
  if (window.performance.now()-startTime<2500) {
      
      image_width = min(w, h*munchBg.width / munchBg.height);
      image_height = min(h, w*munchBg.height / munchBg.width);
      
      image(munchBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
      return;
    }
 capture.loadPixels();
  if (capture.pixels.length > 0) {
    if (previousPixels) {
      // cheap way to ignore duplicate frames
      if (same(previousPixels, capture.pixels, 4, width)) {
        return;
      }
      flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
    }
    previousPixels = copyImage(capture.pixels, previousPixels);
    //image(capture, 0, 0, w, h);
    //filter(BLUR, 0);
    fill(195, 83, 48, 50);
    //*keep overlapping//rect(0, 0, w, h);
    if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      //uMotionGraph.addSample(flow.flow.u);
      //vMotionGraph.addSample(flow.flow.v);
       flow.flow.zones.forEach(function(zone) {
         baseIndex = 4 * (w * zone.y + zone.x);
         r = capture.pixels[baseIndex];
         g = capture.pixels[baseIndex+1];
         b = capture.pixels[baseIndex+2];
         a = (map(zone.u, -step2, +step2, 0, 255) + map(zone.v, -step2, +step2, 0, 255))/2
         //stroke(max(0, r-100), max(0, g-100), max(0, b-100));
         stroke(r-20, g-70, b-70, 90);
         strokeWeight(random(12,10));
         if (zone.u > step2/2 || zone.u < -step2/2 || zone.v > step2/2 || zone.v < -step2/2) {
           curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-6*step2,6*step2), zone.y+random(-6*step2,6*step2), zone.x + -zone.v*6, zone.y + -zone.u*6);
         }
         else if(random(0,5)<1){
         stroke(r-200, g-100, b-50, 90);
         curve(zone.x, zone.y, zone.x+random(0,step2), zone.y+random(0,step2), zone.x+random(0,step2*13), zone.y+random(0,step2*13), zone.x + step2*10, zone.y + step2*10);
         }
       })
    }
    }
  }