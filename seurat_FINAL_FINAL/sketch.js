// https://kylemcdonald.github.io/cv-examples/
// hello mel

var capture;
var previousPixels;
var flow;
var w = 640,
    h = 480;
var step = 8;

var uMotionGraph, vMotionGraph;



function setup() {
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
    flow = new FlowCalculator(step);
  
    fill(255, 255, 255, 50);
    rect(0, 0, w, h);
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
    
    //fill(255, 255, 255, 50);
    //rect(0, 0, w, h);
    //image(capture, 0, 0, w, h);

    if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {

       strokeWeight(0);
       flow.flow.zones.forEach(function(zone) {
         baseIndex = 4 * (w * zone.y + zone.x);
         r = capture.pixels[baseIndex];
         g = capture.pixels[baseIndex+1];
         b = capture.pixels[baseIndex+2];
         a = 200;

         fill(r, g, b, a);
         
         if (zone.u > step/2 || zone.u < -step/2 || zone.v > step/2 || zone.v < -step/2) {
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), step, step);

           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+step+random(-step/2, step/2), zone.y+random(-step/2, step/2), step, step);
         
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+random(-step/2, step/2), zone.y+step+random(-step/2, step/2), step, step);
           
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+step+random(-step/2, step/2), zone.y+step+random(-step/2, step/2), step, step);
         }
        else if(random(0,5)<1){
           fill(r+random(0,80), g+random(0,80), b+random(0,80), 240);
           ellipse(zone.x+step+random(-step/2, step/2), zone.y+step+random(-step/2, step/2), step, step);
         }

       })
    }

       
    }
}