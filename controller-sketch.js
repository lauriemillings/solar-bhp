let controller;

// Button mapping for Xbox controller, there are 17 buttons on an xbox controller, these will be useful later
const buttonNames = [
  'A', // Button 0
  'B', // Button 1
  'X', // Button 2
  'Y', // Button 3
  'LB', // Button 4
  'RB', // Button 5
  'LT', // Button 6
  'RT', // Button 7
  'Select', // Button 8
  'Start', // Button 9
  'Left Stick', // Button 10
  'Right Stick', // Button 11
  'D-Pad Up', // Button 12
  'D-Pad Down', // Button 13
  'D-Pad Left', // Button 14
  'D-Pad Right', // Button 15
  'Home' // Button 16 (Xbox button)
];

// Empty array used to track if a button has been pressed. When it is pressed later code adds it to this array, and when released,
// it gets removed from the array
let previousButtonStates = [];

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  background(0);

  // Get the connected gamepads - Navigator.getGamepads generates a list of all browser-known controllers
  const gamepads = navigator.getGamepads();
  // Gets the first controller in the list
  controller = gamepads[0];

  if (controller) {
    // Display button states and handle press/release functionality
    for (let i = 0; i < controller.buttons.length; i++) {
      const button = controller.buttons[i];
      const name = buttonNames[i] || `Unknown Button ${i}`;
      const wasPressed = previousButtonStates[i] || false;

      // Handle button press/release
      if (button.pressed && !wasPressed) {
        switch (name) {
          case 'A':
            console.log('A button pressed');
            break;
          case 'B':
            console.log('B button pressed');
            break;
          case 'X':
            console.log('X button pressed');
            break;
          case 'Y':
            console.log('Y button pressed');
            break;
          case 'LB':
            console.log('LB button pressed');
            break;
          case 'RB':
            console.log('RB button pressed');
            break;
          case 'Start':
            console.log('Start button pressed');
            break;
          default:
            console.log(`${name} button pressed`);
            break;
        }
      } else if (!button.pressed && wasPressed) {
        switch (name) {
          case 'A':
            console.log('A button released');
            break;
          case 'B':
            console.log('B button released');
            break;
          case 'X':
            console.log('X button released');
            break;
          case 'Y':
            console.log('Y button released');
            break;
          case 'LB':
            console.log('LB button released');
            break;
          case 'RB':
            console.log('RB button released');
            break;
          case 'Start':
            console.log('Start button released');
            break;
          default:
            console.log(`${name} button released`);
            break;
        }
      }

      // Update previous button state
      previousButtonStates[i] = button.pressed;
    }

    // Handle joystick (axes) states
    for (let i = 0; i < controller.axes.length; i += 2) {
      let x = parseFloat(controller.axes[i].toFixed(2));
      let yAxis = parseFloat(controller.axes[i + 1].toFixed(2));

      // Apply deadzone threshold of 10%
      x = Math.abs(x) < 0.1 ? 0 : x;
      yAxis = Math.abs(yAxis) < 0.1 ? 0 : yAxis;

      // Handle joystick functionality
      switch (i / 2) {
        case 0:
          if (x !== 0 || yAxis !== 0) {
            console.log(`Left Stick moved: X=${x}, Y=${yAxis}`);
          }
          break;
        case 1:
          if (x !== 0 || yAxis !== 0) {
            console.log(`Right Stick moved: X=${x}, Y=${yAxis}`);
          }
          break;
        default:
          if (x !== 0 || yAxis !== 0) {
            console.log(`Unknown Stick ${i / 2} moved: X=${x}, Y=${yAxis}`);
          }
          break;
      }
    }
  }
}