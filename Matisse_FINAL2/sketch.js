// https://kylemcdonald.github.io/cv-examples/
// hello mel

var capture;
var previousPixels;
var flow;
var w = 1400,
    h = 611;
var step = 50;


var mimg1;
var mimg2;
var mimg3;
var mimg4;
var mimg5;
var mimg6;
var mimg7;

var matisseBg;

var fade;
var fadeAmount = 1

let fr = 9;

var uMotionGraph, vMotionGraph;
var startTime;

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
    flow = new FlowCalculator(step);
    frameRate(fr);
      
    mimg1 = loadImage("m1.png");
    mimg2 = loadImage("m2.png");
    mimg3 = loadImage("m3.png");
    mimg4 = loadImage("m4.png");
    mimg5 = loadImage("m5.png");
    mimg6 = loadImage("s1.png");
    mimg7 = loadImage("s2.png");
    matisseBg = loadImage("matisseBg.jpg");

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
      image_width = min(w, h*matisseBg.width / matisseBg.height);
      image_height = min(h, w*matisseBg.height / matisseBg.width);
      
      image(matisseBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
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

    fill(255, 255, 255, 50);
    rect(0, 0, w, h);
    
    if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {

       strokeWeight(0);
       flow.flow.zones.forEach(function(zone) {
         baseIndex = 4 * (w * zone.y + zone.x);
         r = capture.pixels[baseIndex];
         g = capture.pixels[baseIndex+1];
         b = capture.pixels[baseIndex+2];
         a = 200;

         fill(r, g, b, a);
         
         if (zone.u > step/1.7 || zone.u < -step/1.7 || zone.v > step/1.7 || zone.v < -step/1.7) {
           rotate(random(0,360), 3);
           
           num=random(0,7);
           if (num<1) {
             image(mimg3, zone.x, zone.y, step*2, step*2);
           }
           else if(num<2) {
             //rotate(random(0,360), 2);
             image(mimg4, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), step*1.5, step*1.5);
           }
          else if(num<3) {
            image(mimg1, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), step*1.5, step*1.5);
           }
          else if(num<4) {
            image(mimg2, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), step*1.5, step*1.5);
           } 
           else if(num<5) {
            image(mimg5, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), step*1.5, step*1.5);
           }
         else if(num<5) {
            image(mimg6, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), 20,20);
           }
           else if(num<6) {
            image(mimg7, zone.x+random(-step/2, step/2), zone.y+random(-step/2, step/2), 20,20);
           }
      }

    });
  }}
}