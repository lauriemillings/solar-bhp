/*
This template visualises UK solar panel installations by Megawatt over the last decade
data is taken from https://www.data.gov.uk/dataset/c647e722-b691-47e9-a765-a22e24f05a04/solar-photovoltaics-deployment
*/
// reference to loaded data
let table;
// array to hold names of year / month
let monthlyNames;
// array to hold MW value of solar panel installations corresponding to monthlyNames
let monthlyValues = [];
// array to hold positions of solar panels displayed
let positions = [];
// minimum MW value
let minValue;
// maximum MW value
let maxValue;
// 'hot' colour
let maxColour;
// 'cold' colour
let minColour;
//store whether it is the first iteration
let first = true;
const HEADERTEXT = "UK Solar Power Installations by Megawatt";
const TOPMARGIN = 52;
let baseSize = 50;
let extraSize = 200;
let rangeStart = 0;
let pendingStart = 0;
let rangeEnd
let pendingEnd

function preload() {
  table = loadTable("data/installs.csv", "csv", "header");
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  // get names of months
  monthlyNames = table.columns;
  // get rid of first value (unused)
  monthlyNames.shift();
  // print(monthlyNames)
  // get number of cols in table
  let colCount = table.getColumnCount();
  // get total monthly value of UK solar installs by MegaWatts
  // ignoring first col, store each col value in row 7 (UK total MW per month) to array
  // use replace to get rid of separating comma used for 1000's eg 13,045.90
  // use parseFloat to turn string into number with decimal place
  for (let i = 1; i <= colCount; i++) {
    monthlyValues.push(parseFloat(table.get(7, i).replace(/,/g, "")));
  }
  print(monthlyValues);
  // calculate min and max MW values from range
  minValue = min(monthlyValues);
  maxValue = max(monthlyValues);
  // set hot and cold colours
  minColour = color(14, 59, 237, 200);
  maxColour = color(237, 14, 14, 200);
  textAlign(CENTER, CENTER);
  noStroke();
  rectMode(CENTER);

  // start Midi
  setupController();

  // initialise positions
  let x, y, d;
  for (let i = 0; i < monthlyValues.length; i++) {
    d = baseSize + map(monthlyValues[i], minValue, maxValue, 0, extraSize);
    x = random(d / 2, width - d / 2);
    y = random(d / 2 + TOPMARGIN, height - d / 2);
    positions.push({ x: x, y: y });
  }
  pendingEnd = rangeEnd = monthlyValues.length;
  
}

function draw() {
  background(bg, 10);
  // draw header
  textSize(36);
  fill(255);
  text(HEADERTEXT, width / 2, TOPMARGIN / 2);
  // declare temporary variables
  let x, y, d;
  // size values

  // calculate a value from 0 to 1 based on the current MW value compared to precalculated min and max MW values
  let delta;
  rangeStart = pendingStart;
  rangeEnd = pendingEnd;
  for (let i = rangeStart; i < rangeEnd; i++) {
    // calculate size
    d = baseSize + map(monthlyValues[i], minValue, maxValue, 0, extraSize);

    let noiseX = noise(positions[i].x);
    let noiseY = noise(positions[i].y);
    
    x = positions[i].x + map(noiseX, 0, 1, -50, 50);
    y = positions[i].y + map(noiseY, 0, 1, -50, 50);

    positions[i].x += 0.01;
    positions[i].y += 0.01;

    // mouse controls - change for controller
    // circle size increases when hovered over
    let mouseDistance = dist(x, y, mouseX, mouseY);
    // radius of circle sizes
    let mouseRadius = map(mouseDistance, 0, width, 100, 10); //100 is closest, 10 is furthest
    // calculates circle size
    let finalRadius = d + mouseRadius;

    delta = map(monthlyValues[i], minValue, maxValue, 0, 1);
    noStroke();
    fill(lerpColor(minColour, maxColour, delta));
    circle(x, y, finalRadius);
    textSize(12);
    fill(0);
    noStroke();
    // add text label
    text(monthlyNames[i], x, y);
  }
}

let bg = 0;

/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e
 */
function allCC(e) {
  // console.log("controller:", e.controller.number, "value:", e.value);
  switch (e.controller.number) {
    case 32: {
      // bg = e.value * 255;
      // background(bg);
      break;
    }
    case 33: {
    // let controlX = e.value * x;
    // let controlY = e.value * y;
    // let controlDistance = dist(x, y, controlX, controlY);
    // let controlRadius = map(controlDistance, 0, width, 100, 10); //100 is closest, 10 is furthest
    // let finalRadius = d + controlRadius;
    // circle(x, y, finalRadius);
      break;
    }
    case 34: {
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      pendingStart = floor(map(e.value, 0, 1, 0, floor(monthlyValues.length/2) ))
      break;
    }
    case 37: {
      pendingEnd = floor(map(e.value, 0, 1, floor(monthlyValues.length/2)+1, monthlyValues.length))
      break;
    }
    case 38: {
      break;
    }
    case 39: {
      break;
    }
  }
}

/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e
 */
function allNoteOn(e) {
  console.log("controller:", e.data[1], "value:", e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 42: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
      } else {
      }
      break;
    }
  }
}
