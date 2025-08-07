/**
 * @fileoverview A TypeScript script to move the mouse cursor to random positions on the screen at random intervals.
 * @author Your Name
 * @date 2025-08-07
 *
 * To Run This Script:
 * 1. Make sure you have Node.js and npm installed.
 * 2. Install TypeScript and ts-node globally: npm install -g typescript ts-node
 * 3. Install robotjs and its type definitions: npm install robotjs @types/robotjs
 * 4. Install Node.js type definitions: npm install @types/node
 * 5. Save this code as a file (e.g., `move-mouse.ts`).
 * 6. Run the script from your terminal: ts-node move-mouse.ts
 * 7. To stop the script, press Ctrl+C in the terminal.
 */

// Import the robotjs library.
// The default import is used here to correctly handle the CommonJS module format of robotjs.
import robot from 'robotjs';

let movementTimeout: NodeJS.Timeout | null = null;

/**
 * Moves the mouse to a random x and y coordinate on the screen.
 */
function moveMouseRandomly(): void {
  try {
    // Get the screen's dimensions (width and height).
    const screenSize: { width: number; height: number } = robot.getScreenSize();
    const screenHeight: number = screenSize.height;
    const screenWidth: number = screenSize.width;

    // Calculate a random X coordinate within the screen width.
    const randomX: number = Math.floor(Math.random() * screenWidth);

    // Calculate a random Y coordinate within the screen height.
    const randomY: number = Math.floor(Math.random() * screenHeight);

    // Log the action to the console for user feedback.
    console.log(`Moving mouse to coordinates: (${randomX}, ${randomY})`);

    // Use robotjs to smoothly move the mouse to the new random coordinates.
    robot.moveMouse(randomX, randomY);

  } catch (error) {
    console.error("An error occurred:", error);
    console.error("Please ensure you have a graphical environment running.");
    // Stop the loop if an error occurs to prevent repeated failures.
    if (movementTimeout) {
      clearTimeout(movementTimeout);
    }
  }
}

// --- Script Execution ---

// Define the minimum and maximum interval time in milliseconds.
const minIntervalTime: number = 1000 * 30; // 30 second
const maxIntervalTime: number = 1000 * 60 * 4; // 4 minutes

/**
 * The main loop function. It moves the mouse, then schedules the next move
 * after a random delay. This recursive use of setTimeout creates a loop with
 * a variable interval.
 */
function randomMouseLoop(): void {
  // First, perform the action.
  moveMouseRandomly();

  // Next, calculate a random delay for the next execution.
  const randomDelay = Math.floor(Math.random() * (maxIntervalTime - minIntervalTime + 1)) + minIntervalTime;

  console.log(`Next movement in ${(randomDelay / 1000).toFixed(2)} seconds...`);

  // Schedule the next call to this same function.
  movementTimeout = setTimeout(randomMouseLoop, randomDelay);
}


console.log("Starting random mouse movement...");
console.log(`The mouse will move at random intervals between ${minIntervalTime / 1000} and ${maxIntervalTime / 1000} seconds.`);
console.log("Press Ctrl+C in this terminal to stop the script.");

// Start the loop.
randomMouseLoop();
