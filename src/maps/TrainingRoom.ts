import { GAME_WIDTH, GAME_HEIGHT } from "../core/Canvas";
import { ICamera } from "../core/Camera";

const CELL_SIZE: number = 32;
const GRID_WIDTH: number = Math.ceil(GAME_WIDTH / CELL_SIZE);
const GRID_HEIGHT: number = Math.ceil(GAME_HEIGHT / CELL_SIZE);

// Renders a grid on the canvas for the training room background
// Each cell is CELL_SIZE x CELL_SIZE pixels
export function renderGrid(ctx: CanvasRenderingContext2D, camera: ICamera): void {
  const cameraX = camera.position.x;
  const cameraY = camera.position.y;

  // always do two nested loops to cover rows and columns
  // then calculate x and y based on the current row and column
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;

      ctx.fillStyle = "#0B1220";
      ctx.fillRect(x - cameraX, y - cameraY, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x - cameraX, y - cameraY, CELL_SIZE, CELL_SIZE);
    }
  }
}
