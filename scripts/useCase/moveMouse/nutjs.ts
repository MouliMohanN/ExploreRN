// Import necessary functions from nut-js
import { mouse, screen } from "@nut-tree-fork/nut-js";
import { MoveMouseConstants } from "./constants.ts";

// Define the screen boundaries
// screen.config.autoDelayMs = 0; // Move instantly

async function moveMouseRandomly() {
  try {
    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);

    console.log(`Moving mouse to: (${randomX}, ${randomY})`);
    await mouse.move([
      { x: randomX, y: randomY }
    ]);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// --- Script Execution ---
// Define the minimum and maximum interval time in milliseconds.
const minIntervalTime: number = MoveMouseConstants.minIntervalTime; // 30 second
const maxIntervalTime: number = MoveMouseConstants.maxIntervalTime; // 4 minutes

async function randomMouseLoop() {
  await moveMouseRandomly();

  const randomDelay = Math.floor(Math.random() * (maxIntervalTime - minIntervalTime + 1)) + minIntervalTime;
  console.log(`Next movement in ${(randomDelay / 1000).toFixed(2)} seconds...`);

  setTimeout(randomMouseLoop, randomDelay);
}

console.log("Starting random mouse movement with nut.js...");
console.log("Press Ctrl+C to stop.");
randomMouseLoop();