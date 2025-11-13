const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CELL_SIZE: number = 64;
const GRID_WIDTH: number = Math.ceil(CANVAS_WIDTH / CELL_SIZE);
const GRID_HEIGHT: number = Math.ceil(CANVAS_HEIGHT / CELL_SIZE);

// Renders a grid on the canvas for the training room background
// Each cell is CELL_SIZE x CELL_SIZE pixels
export function renderGrid(ctx: CanvasRenderingContext2D): void {
  // always do two nested loops to cover rows and columns
  // then calculate x and y based on the current row and column
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE;

      ctx.fillStyle = "#1B254A";
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = "#9B9B9B";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    }
  }
}
