// https://kylemcdonald.github.io/cv-examples/
// hello mel

var capture;
var previousPixels;
var flow;
var w = 640,
    h = 480;
var step = 9;

var monetBg;
var startTime;

var uMotionGraph, vMotionGraph;


function setup() {
    let fs = fullscreen();
    fullscreen(!fs);
  
    w = displayWidth;
    h = displayHeight;
  
    createCanvas(w,h);
    frameRate(fr);
  
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
  
    monetBg = loadImage("monetBg.jpg");
    startTime = window.performance.now();
  
    fill(250, 250, 250, 50);
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
  /*if (window.performance.now()-startTime<2500) {
      image(monetBg, 0, 0, w, h);
      return;
    }*/
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

       strokeWeight(3);
       flow.flow.zones.forEach(function(zone) {
         baseIndex = 4 * (w * zone.y + zone.x);
         r = capture.pixels[baseIndex];
         g = capture.pixels[baseIndex+1];
         b = capture.pixels[baseIndex+2];
         a = 100;

         //fill(r, g, b, a);
         stroke(r+random(180,250), g+random(180,250), b+random(180,250), a-50);
         strokeWeight(random(3,8));
         
         if (zone.u > step/2 || zone.u < -step/2 || zone.v > step/2 || zone.v < -step/2) {
           stroke(r+random(180,250), g+random(180,250), b+(random(180,250)), a+(random(0,50)));
           curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-3*step,6*step), zone.y+random(-3*step,3*step), zone.x + -zone.v*6, zone.y + -zone.u*6);  
           //sun
           stroke(r+random(50,220), g+random(50,80), b+(random(50,60)), a);
           curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-6*step,6*step), zone.y+random(-2*step,2*step), zone.x + -zone.v*6, zone.y + -zone.u*6);
         }
        else if(random(0,5)<1){
          stroke(r+random(-10,20), g+random(20,40), b+random(40,60), a);
          strokeWeight(random(5,9));
          curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-6*step,6*step), zone.y+random(-2*step,2*step), zone.x + -zone.v*6, zone.y + -zone.u*6);
         }

       })
    }

       
    }
}