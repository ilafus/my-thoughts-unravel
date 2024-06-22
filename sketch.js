/*Interactive Music Visualizer
 *
 * This code is the main subject of an interactive web experience designed to promote the music of Maehwa Ro's soon-to-be released track "My Thoughts Unravel".
 * It creates a visually engaging environment to be explored through the use of MIDI controller, PC keyboard and mouse that will make you interact with the artist's music and visuals by providing an immersive experience for the audience. The visualizer includes two central figures, pearl and bubble (gems) objects and star images. They all can be modified as one's wish in terms of shape, position or rotation to respond to the music being played in the background.
 *
 * Features:
 * - A play button to start the music
 * - Aesthetically styled audiovisual elements to enhance the user experience
 * - Streaming platforms and SNS links to connect with the artist's contents
 *
 * Author: [Ilaria Fusaro]
 * Date: [2024/06]
 *
 * Instructions:
 * - Click the "play" button to start the music.
 * - Interact with music and visuals through MIDI controller and/or PC keyboard and mouse.
 */

//GLOBAL VARIABLES
//pearl
let angle = 0.0;
//let speed = 0.4;
let direction = 0.5;

//midi
let osc;
let env;

//basic values
let q = 3;
let w = 10;
let t = 100;
let u = 100;
let o = 1;
let p = 5;

//music
let s;
let v;
let volume = 2;
let speed = 1;
let song;

//stars and gems
let r;
let rs;
let sprite;
let gem, gems;

function preload() {
  song = loadSound("thoughtsunravelCompressed.mp3");
  starr = loadImage("star.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // noStroke();

  angleMode(DEGREES);
  frameRate(60); 
  camera.zoom = 0.5;
  button = createButton("PLAY");
  button.mousePressed(togglePlaying);

  button.mouseOver(() => {
    button.style("background-color", "#7A1BE1"); // Darker shade of purple
  });
  button.mouseOut(() => {
    button.style("background-color", "#8A2BE2"); // Original shade of purple
  });

  //Star constructor
  r = new Group();
  r.image = "star.png";
  r.amount = 50;
  r.x = () => random(-1800, canvas.w);
  r.y = () => random(-1800, canvas.h);

  while (r.amount < 4) {
    let rs = new r.Sprite();
    rs.x = r.amount * 2;
    rs.x = r.length * random(3, -20);
    rs.y = r.length * random(-10, 10);
  }

  //Gems constructor
  gems = new Group();
  gems.diameter = () => random(50, 200); //10 to 70
  gems.x = () => random(-1800, canvas.w);
  gems.y = () => random(-1800, canvas.h);
  gems.amount = 100;
  //gems.color = () => random(100,40)
  gems.fill = color(152, 235, 178, 80);
  gems.stroke = color("white");

  // Loop the sound forever (at least until stop() is called)
  //song.loop();

  //SLIDERS (hidden)
  s1 = createSlider(q, q, 3).position(20, 150);
  p1 = createP("Knob 1: number of shapes").position(20, 0);
  s1.hide();
  s2 = createSlider(w, w, 10).position(20, 250);
  p2 = createP("Knob 2: orange shape").position(20, 100);
  s2.hide();
  s3 = createSlider(p, p, 5).position(20, 350);
  p3 = createP("Knob 3: white shape").position(20, 200);
  s3.hide();
  s4 = createSlider(t, t, 100).position(20, 450);
  p4 = createP("Knob 4: orange shape - out").position(20, 300);
  s4.hide();
  s5 = createSlider(u, u, 100).position(20, 550);
  p5 = createP("Knob 5: orange shape - in").position(20, 400);
  s5.hide();
  s6 = createSlider(o, o, 1).position(20, 650);
  p6 = createP("Knob 6: rotation").position(20, 500);
  s6.hide();
  s7 = createSlider(volume, volume, 1).position(20, 750);
  p7 = createP("Knob 7: song volume").position(20, 600);
  s7.hide();
  s8 = createSlider(speed, speed, 1).position(20, 850);
  p8 = createP("Knob 8: song speed").position(20, 700);
  s8.hide();

  p9 = createP('Press "a"').position(1750, 150);
  p10 = createP('Press "space"').position(1750, 350);
  p11 = createP("Try to drag the stars").position(1750, 550);
  p12 = createP(
    "Connect your Launchkey mini MIDI controller for a better experience"
  ).position(470, 750);

  //pearl object
  pearl1 = new Pearl(100, 50);
}

function draw() {
  background(207, 196, 255);

  noFill();
  // strokeWeight(8);

  // Set the song volume to a range between 0 and 1.0
  v = constrain(volume, 0, 1.0);
  song.amp(volume);

  // Set the pitch rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  s = constrain(speed, 1, 4);
  song.rate(speed);

  keyboardControl();

  push();
  drawShapes();

  pearl1.show();
  pop();

  midiControl();

  r.scale = 0.2;
  playStar();
  pop();
}

//COMMANDS of KEYBOARD AND MOUSE
function keyboardControl() {
  if (kb.presses(" ")) {
    camera.zoomTo(10);
    //background(160, 208, 255);
  } else if (kb.released(" ")) {
    camera.zoomTo(0.6);
  } else if (kb.pressing("a")) {
    background(212, 225, 176);
    camera.x = sin(frameCount) * 200 + 250;
  } else if (kb.space >= 1) {
    background(145, 194, 245);
  } else if (kb.released("a")) {
    background(207, 196, 255);
  }
}

//COMMANDS of MIDI CONTROL
function midiControl() {
  if (channel == 21) {
    //knob1 : vertex and n of main shape
    q = map(value, 0, 127, 3, 8);
  } else if (channel == 22) {
    //knob2 : form of main shape
    w = map(value, 0, 127, 10, height);
  } else if (channel == 23) {
    //knob3 : small shape y
    p = map(value, 0, 127, 5, 100);
  } else if (channel == 24) {
    //knob4 : form of center shape
    t = map(value, 0, 127, 100, 200);
  } else if (channel == 25) {
    //knob5 : rad of orange and y of white shapes
    u = map(value, 0, 127, 100, 200);
  } else if (channel == 26) {
    //knob6 : rotation of shapes
    o = map(value, 0, 127, 1, 3);
  } else if (channel == 27) {
    //knob7 : song volume
    volume = map(value, 0, width, 0, 10);
  } else if (channel == 28) {
    //knob8 : song pitch
    speed = map(value, 0, height, 1, 4);
  }
}

//DRAW CENTER SHAPES
function drawShapes() {
  strokeWeight(8);

  //CENTER main SHAPE
  for (var n = 0; n < q; n++) {
    stroke(232 + n * 14, 132 + n * 10, 94); // main figure color
    beginShape();
    for (var i = 0; i < 360; i++) {
      var rad = map(sin(i * w + frameCount), -1, 1, t, u);
      var x = rad * cos(i);
      var y = rad * sin(i);
      var z = rad * sin(frameCount * 2 + i * 5);
      vertex(x, y, z);
    }
    endShape(CLOSE);
    rotate(frameCount * o);

    //CENTER small SHAPE
    for (let x = 0; x <= t; x += 200) {
      for (let y = -150; y <= u; y += 100) {
        noFill();
        rotateY(frameCount * o);
        strokeWeight(1);
        stroke(255);
        bezier(-q, p, 30, 5, 90, 90, 15, q);
        bezier(-q, p, 40, 90, 30, 30, 15, q);
        bezier(q, -p, -30, -5, -90, -90, -15, -q);
        bezier(q, -p, -40, -90, -30, -30, -15, -q);
      }
    }
  }
}

//Make more stars and let them be grabbed and move around
function playStar() {
  for (var rs of r) {
    if (rs.mouse.dragging()) {
      rs.moveTowards(
        mouse.x + rs.mouse.x,
        mouse.y + rs.mouse.y,
        0.1 // full tracking
      );
    }
    if (rs.mouse.hovering()) {
      mouse.cursor = "grab";
    } else if (rs.mouse.hovering == false) {
      mouse.cursor = "default";
    }
  }
}

//Button PLAY
function togglePlaying() {
  if (!song.isPlaying) {
    // Start playing the song
    song.play();
    song.isPlaying = true;
    button.hide(); // Hide the button
  } else {
    //song.stop();
    song.isPlaying = false;
    button.show();
  }
}
