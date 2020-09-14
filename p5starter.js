// https://kylemcdonald.github.io/cv-examples/
// hello mel
//////////
//Creating animations
var serial;     
var portName = '/dev/tty.wchusbserial1420';
/////////
var capture;
var previousPixels;
var flow;
var w = 1400,
    h = 611;
var step6 = 50;
var step5 = 8;
var step4 = 4;
var step3 = 9;
var step2 = 8;
var step1 = 8;

////////////////////////////////////////////////////////////////////
var turnit;
/////////////////////////////////////////////////////////////////////////
var mimg1;
var mimg2;
var mimg3;
var mimg4;
var mimg5;
var mimg6;
var mimg7;//6
var matisseBg;
var fade;
var fadeAmount = 1

let fr6 = 9;

var uMotionGraph, vMotionGraph;
var startTime;
//////////////////////////////////
var img1;
var img2;
var kleeBg;
let time = 0;
/////////////////////
var monetBg;
//////////////////
var munchBg;
//////////////////
var seuratBg;
//////////////////
var bornimg1;
var bornmimg2;
var bornmimg3;
var bornmimg4;
var bornmimg5;
var bornmimg6;
//////////////////
var aimg1;
var aimg2;
var aimg3;
var aimg4;
var aimg5;
var aimg6;
/////////////////////////////////////////////////////////////////////////
function setup() {
  ///////////////////
  serial = new p5.SerialPort();  
 
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName); 
  
  /////////////////
  let fs = fullscreen();
  fullscreen(!fs);
  
  w = displayWidth;
  h = displayHeight;
  ///////////////////////////////////////
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
    
  ///////////////6
  frameRate(fr6);
    mimg1 = loadImage("m1.png");
    mimg2 = loadImage("m2.png");
    mimg3 = loadImage("m3.png");
    mimg4 = loadImage("m4.png");
    mimg5 = loadImage("m5.png");
    mimg6 = loadImage("s1.png");
    mimg7 = loadImage("s2.png");
    matisseBg = loadImage("matisseBg.jpg");
  ///////5
    okeefeBg = loadImage("okeefeBg.jpg");
  //////4
    img1 = loadImage("moon.png");
    img2 = loadImage("bg.png");
    kleeBg = loadImage("kleeBg.jpg");
    munchBg = loadImage("munchBg.jpg");
    seuratBg = loadImage("seuratBg.jpg");
    monetBg = loadImage("monetBg.jpg");
  //////4
    bornimg1 = loadImage("1.png");
    bornimg2 = loadImage("2.png");
    bornimg3 = loadImage("3.png");
    bornimg4 = loadImage("4.png");
    bornimg5 = loadImage("5.png");
    bornimg6 = loadImage("6.png");
  //////
    aimg1 = loadImage("a1.png");
    aimg2 = loadImage("a2.png");
    aimg3 = loadImage("a3.png");
    aimg4 = loadImage("a4.png");
    aimg5 = loadImage("a5.png");
    aimg6 = loadImage("a6.png");
  
    startTime = window.performance.now();  
}
////////////////////////////////////////////////////
function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  turnit = Number(serial.read());
  console.log (turnit);
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

/////////////////////////////////////////////////////
function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) dst = new src.constructor(n);
    while (n--) dst[n] = src[n];
    return dst;
}
/////////////////////////////////////////////////////
function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}
///////////////////////////////////////////////////////////////////////
function draw() {
  
  ////////////////////////////////////////////////////////////////////////////////
  if (turnit == 11){
     background(0);
      image_width = min(w, h*seuratBg.width / seuratBg.height);
      image_height = min(h, w*seuratBg.height / seuratBg.width);
      
      image(seuratBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
      
    
    
  } else if (turnit == 12){
    flow = new FlowCalculator(step1);
     
     

     
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
         
         if (zone.u > step1/2 || zone.u < -step1/2 || zone.v > step1/2 || zone.v < -step1/2) {
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+random(-step1/2, step1/2), zone.y+random(-step1/2, step1/2), step1, step1);

           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+step1+random(-step1/2, step1/2), zone.y+random(-step1/2, step1/2), step1, step1);
         
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+random(-step1/2, step1/2), zone.y+step1+random(-step1/2, step1/2), step1, step1);
           
           fill(r+random(0,80), g+random(0,80), b+random(0,120), a);
           ellipse(zone.x+step1+random(-step1/2, step1/2), zone.y+step1+random(-step1/2, step1/2), step1, step1);
         }
        else if(random(0,5)<1){
           fill(r+random(0,80), g+random(0,80), b+random(0,80), 240);
           ellipse(zone.x+step1+random(-step1/2, step1/2), zone.y+step1+random(-step1/2, step1/2), step1, step1);
         }
        else if(random(0,5)<1){
         stroke(r+200, g+200, b+250, 10);
         curve(zone.x, zone.y, zone.x+random(0,step1), zone.y+random(0,step1), zone.x+random(0,step1*3), zone.y+random(0,step1*5), zone.x+step1*15, zone.y+ step1*15);
         }

       })
    }
    
    }
    
  
  } else if ( turnit ==13){
     background(0);
    image_width = min(w, h*aimg1.width / aimg1.height);
    image_height = min(h, w*aimg1.height / aimg1.width);
      
    image(aimg1, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    
    
  }else if ( turnit ==21){
     background(0);
      image_width = min(w, h*munchBg.width / munchBg.height);
      image_height = min(h, w*munchBg.height / munchBg.width);
      
      image(munchBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    
  } else if ( turnit ==22 ) {
    flow = new FlowCalculator(step2);
      
      
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
         stroke(r-20, g-70, b-70, a);
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
    
} else if (turnit ==23) {
   background(0);
    image_width = min(w, h*aimg3.width / aimg3.height);
    image_height = min(h, w*aimg3.height / aimg3.width);
      
    image(aimg2, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
  
}else if (turnit ==31) {
   background(0);
  image_width = min(w, h*monetBg.width / monetBg.height);
  image_height = min(h, w*monetBg.height / monetBg.width);
      
  image(monetBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
  
} else if (turnit == 32) {
 
flow = new FlowCalculator(step3);  
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
         
         if (zone.u > step3/2 || zone.u < -step3/2 || zone.v > step3/2 || zone.v < -step3/2) {
           stroke(r+random(180,250), g+random(180,250), b+(random(180,250)), a+(random(0,50)));
           curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-3*step3,6*step3), zone.y+random(-3*step3,3*step3), zone.x + -zone.v*6, zone.y + -zone.u*6);  
           //sun
           stroke(r+random(50,220), g+random(50,80), b+(random(50,60)), a);
           curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-6*step3,6*step3), zone.y+random(-2*step3,2*step3), zone.x + -zone.v*6, zone.y + -zone.u*6);
         }
        else if(random(0,5)<1){
          stroke(r+random(-10,20), g+random(20,40), b+random(40,60), a);
          strokeWeight(random(5,9));
          curve(zone.x+zone.v*2, zone.y+zone.u*2, zone.x, zone.y, zone.x+random(-6*step3,6*step3), zone.y+random(-2*step3,2*step3), zone.x + -zone.v*6, zone.y + -zone.u*6);
         }

       })
    }

       
    }  
  
  
} else if (turnit ==33) {
   background(0);
    image_width = min(w, h*aimg3.width / aimg3.height);
    image_height = min(h, w*aimg3.height / aimg3.width);
      
    image(aimg3, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
  
}/////////////////////////////////////////
  else if (turnit ==41) {
     background(0);
      image_width = min(w, h*kleeBg.width / kleeBg.height);
      image_height = min(h, w*kleeBg.height / kleeBg.width);
      
      image(kleeBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    
  } else if (turnit == 42) {
   

      
     background(178,34,34); 
    //time+= window.performance.now();
    capture.loadPixels();
    
    size = 35;
  
    fill(240, 50, 20);
    image(img2, 0, 0, w, h);
    //rect(0, 0, w, h);
  
    strokeWeight(1);
    stroke(255,255,255);
    
    //for (i = size; i < w-size*1.2; i += size) {  
    for (i = size; i < w/1.05; i += size) {
        for (j = size; j < h; j += size) {
            
            //sun static box
            if (i > 0.6*w && i < 0.8*w && j > 0*h && j < 0.35*h) {
            continue;
            }
            //first static box
            else if (i > 0.1*w && i < 0.2*w && j > 0*h && j < 0.4*h) {
            continue;
            }
            else if (i > 0.35*w && i < 0.4*w && j > 0*h && j < 0.3*h) {
            continue;
            }
            else if (i > 0.5*w && i < 0.6*w && j > 0.05 && j < 120) {
            continue;
            }
            
            baseIndex = 4 * (w * j + i);
            r = capture.pixels[baseIndex];
            g = capture.pixels[baseIndex+1];
            b = capture.pixels[baseIndex+2];
            a = capture.pixels[baseIndex+3];
            
            shape = random(0,5);
          
            if (shape < 1) {
              fill(r, 0, b-200);
              rect(i, j, size, size);
            }
            else if (shape < 2) {
              fill(r, 0, b);
              rect(i, j, size/4, size/2);
              fill(r, g, b-200);
              rect(i+size/2, j, size/2, size/2);
              fill(r, g-200, b-100);
              rect(i, j+size/2, size/2, size/2);
              fill(r, g-200, b);
              rect(i+size/2, j+size/2, size/4, size/2);
            }
            else if (shape < 3) {
              fill(r+100, g-100, b);
              rect(i, j, size, size);
              fill(r+50, g-100, b-100);
              triangle(i, j, i, j+size, i+size, j+size);
            }
            else if (shape < 4) {
              fill(r+100, g, 0);
              rect(i, j, size, size);
              fill(r+100, g-50, b-100);
              triangle(i+size/2, j, i, j+size, i+size, j+size);
            }
            else if (shape < 5) {
              fill(r+50, g-100, 0, 150);
              rect(i, j, size, size);
              fill(r+50, 0, 0, 150);
              rect(i, j, size, size/2);
              fill(r, g, 0, 150);
              rect(i, j+size/2, size, size/2);
            
            }
        }
    }
    
  
    //for (i = 0; i < 10; i ++) {
    //x = int(random(0,w/size));
    //y = int(random(0,h/size));
    
    //fill(250, 100, 150, 220);
    //rect(x*size, y*size, size*3, size*3);
    
    fill(235, 170, 30);
    ellipse(0.7*w,150,150);
    //image(img1, 310, 40, 100, 100);
    
    //}    
  
  
} else if (turnit ==43){
   background(0);
    image_width = min(w, h*aimg4.width / aimg4.height);
    image_height = min(h, w*aimg4.height / aimg4.width);
      
    image(aimg4, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
  
}////////////////////////////////////////////////////////////////////////////////
  else if (turnit ==51){
    background(0);
      image_width = min(w, h*okeefeBg.width / okeefeBg.height);
      image_height = min(h, w*okeefeBg.height / okeefeBg.width);
      
      image(okeefeBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    
  } else if (turnit == 52){
    flow = new FlowCalculator(step5);

      
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
         if (zone.u > step5/1.1 || zone.u < -step5/1.1 || zone.v > step5/1.1 || zone.v < -step5/1.1) {
           curve(random(0,zone.x), w/1.2, w/2, zone.y, zone.x+random(-2*step5,2*step5), random(0, zone.y), (zone.x < w/2) ? 0 : w, 0);
         }
         else if(random(0,5)<1){
         strokeWeight(random(12,28));
         stroke(r+200, g+180, b+195, 240);
         curve(zone.x+random(0,step5), zone.y, zone.x+random(0,step5*10), zone.y+random(0,step5), zone.x+random(0,step5), zone.y+random(0,step5*13), zone.x + step5*10, zone.y + step5*10);
         }
       })
    }

    }
    
    
    }else if (turnit ==53) {
      background(0);
    image_width = min(w, h*aimg5.width / aimg5.height);
    image_height = min(h, w*aimg5.height / aimg5.width);
      
    image(aimg5, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    }/////////////////////////////////////////////////////////////////////////////////
  else if (turnit ==61) {
    background(0);
      image_width = min(w, h*matisseBg.width / matisseBg.height);
      image_height = min(h, w*matisseBg.height / matisseBg.width);
      
      image(matisseBg, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
    
  } else if (turnit == 62){
    flow = new FlowCalculator(step6);
    //6
     
  
   
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
         
         if (zone.u > step6/1.7 || zone.u < -step6/1.7 || zone.v > step6/1.7 || zone.v < -step6/1.7) {
           rotate(random(0,360), 3);
           
           num=random(0,7);
           if (num<1) {
             image(mimg3, zone.x, zone.y, step6*2, step6*2);
           }
           else if(num<2) {
             //rotate(random(0,360), 2);
             image(mimg4, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), step6*1.5, step6*1.5);
           }
          else if(num<3) {
            image(mimg1, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), step6*1.5, step6*1.5);
           }
          else if(num<4) {
            image(mimg2, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), step6*1.5, step6*1.5);
           } 
           else if(num<5) {
            image(mimg5, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), step6*1.5, step6*1.5);
           }
         else if(num<5) {
            image(mimg6, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), 20,20);
           }
           else if(num<6) {
            image(mimg7, zone.x+random(-step6/2, step6/2), zone.y+random(-step6/2, step6/2), 20,20);
           }
      }

    });
  }} 
  } else if ( turnit ==63){
    background(0);
    image_width = min(w, h*aimg6.width / aimg6.height);
    image_height = min(h, w*aimg6.height / aimg6.width);
      
    image(aimg6, w/2-image_width/2, h/2-image_height/2, image_width, image_height);
  }
}
