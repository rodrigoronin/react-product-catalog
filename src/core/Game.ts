import { Player } from "../entities/Player";
import { getDirections } from "../input/InputManager";
import { renderGrid } from "../core/TrainingRoom";

const app: HTMLElement | null = document.getElementById("app");
export const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.setAttribute("id", "canvas");
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;

if (app) app.appendChild(canvas);
else console.log("App render error. Canvas couldn't be created");

const CANVAS_WIDTH: number = 800;
const CANVAS_HEIGHT: number = 600;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.backgroundColor = "#302F2F";

let lastTime: number = 0;

const player = new Player({
  position: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
  size: { width: 32, height: 32 },
  speed: 100,
  color: "green",
});

function update(deltaTime: number): void {
  if (deltaTime > 0) {
    const dir = getDirections();
    player.update(deltaTime, dir);
  }
}

function render(): void {
  if (!ctx) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  renderGrid(ctx);

  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.position.x - player.size.width / 2,
    player.position.y - player.size.height / 2,
    player.size.width,
    player.size.height
  );
}

// The value passed from requestAnimationFrame is a timestamp
// not the delta time between frames, we need to calculate it ourselves
// delta time: time difference between current frame and last frame
function gameLoop(timestamp: number): void {
  if (!lastTime) lastTime = timestamp; // Initialize lastTime on the first frame
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  render();

  requestAnimationFrame(gameLoop);
}

export { gameLoop };
